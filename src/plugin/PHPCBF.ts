import * as vscode from "vscode";
import * as childProcess from "child_process";
import * as fs from "fs";

import PluginAbstract from "@interface/PluginAbstract";

export default class PHPCBF extends PluginAbstract {
    public pluginName: string = "PHPCBF";

    public registerSubscriptionsTool(): void {
        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPCBFVersion", () => {
                this.showPHPCBFVersion();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPCBFInstalledCodingStandards", () => {
                this.showPHPBFInstalledCodingStandards();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.phpcbfDocument", () => {
                this.phpCBFCurrentDocument();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider("php", {
                provideDocumentFormattingEdits: (document, options, token) => {
                    return new Promise(async (resolve, reject) => {
                        this.log("Formatting document: " + document.fileName);
                        const originalText = document.getText();
                        let lastLine = document.lineAt(document.lineCount - 1);
                        let range = new vscode.Range(new vscode.Position(0, 0), lastLine.range.end);
                        const fixedText = await this.formatDocument(document);
                        if (fixedText.length > 0 && fixedText !== originalText) {
                            this.log("Document: " + document.fileName + " - formatted.");
                            resolve([new vscode.TextEdit(range, fixedText)]);
                        } else if (fixedText === originalText) {
                            this.log("Document: " + document.fileName + " - no changes made.");
                        } else {
                            this.log("Document: " + document.fileName + " - formatting failed.");
                        }
                        reject();
                    });
                },
            })
        );
    }

    public initTool(): void {
        this.setConfig("report_format", "full");
        if (this.getConfig().getPHPCBFConfig().isShowWarningsEnabled()) {
            this.setConfig("show_warnings", "1");
        } else {
            this.setConfig("show_warnings", "0");
        }
        this.setConfig("severity", this.getConfig().getPHPCBFConfig().getErrorSeverityLevel().toString());
        this.setConfig("error_severity", this.getConfig().getPHPCBFConfig().getErrorSeverityLevel().toString());
        this.setConfig("error_warning", this.getConfig().getPHPCBFConfig().getWarningSeverityLevel().toString());
    }

    public showPHPCBFVersion(): void {
        this.checkIfEnabled();
        const phpExecutablePath = this.getPluginPHPExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCBFExecutablePath = this.getToolExecutablePath;
        this.log("PHPCBF Executable Path: " + phpCBFExecutablePath, null, 0);
        this.execute(phpExecutablePath + " -v", false);
        const command = this.getExceuteBaseCommand() + " --version";
        this.execute(command, true);
    }

    public async showPHPBFInstalledCodingStandards(): Promise<void> {
        let phpcbfCommand = this.getExceuteBaseCommand();
        phpcbfCommand += " -i";
        await this.execute(phpcbfCommand);
    }

    public phpCBFCurrentDocument(): void {
        this.phpCBFDocument(this.getCurrentlyOpenTabDocumentPath());
    }

    public async phpCBFDocument(filePath: string): Promise<void> {
        let phpcbfCommand = this.getExceuteBaseCommand();
        phpcbfCommand += " --standard=" + this.getConfig().getPHPCBFConfig().getStandard() + " ";
        phpcbfCommand += "--no-colors ";
        phpcbfCommand += filePath;
        await this.execute(phpcbfCommand);
    }

    public async formatDocument(document: vscode.TextDocument): Promise<string> {
        this.log("Formatting document: " + document.fileName);
        let text = document.getText();
        let phpcbfError = false;
        let tempFileName =
            this.getTempDirectory() +
            "/temp-" +
            Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 10) +
            ".php";
        this.log("Temp file name: " + tempFileName);
        fs.writeFileSync(tempFileName, text);

        let phpcbfCommand = this.getExceuteBaseCommand();
        if (this.isDebugEnabled()) {
            phpcbfCommand += "-l ";
        } else {
            phpcbfCommand += "-lq ";
        }

        phpcbfCommand += tempFileName + " ";
        phpcbfCommand += " --standard=" + this.getConfig().getPHPCBFConfig().getStandard() + " ";

        const formatSuccess = await this.execute(phpcbfCommand);

        let fixed = fs.readFileSync(tempFileName, "utf-8");

        return fixed;
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getPluginPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getPHPCBFConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpCBFExecutablePath = this.getConfig().getPHPCBFConfig().getExecutablePath();
        if (this.isEnabled() && phpCBFExecutablePath) {
            return phpCBFExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcbf is disabled.");
        throw new Error("PHPThunder: phpcbf is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPCBFConfig().isEnabled();
        }
        return false;
    }
}
