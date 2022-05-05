import * as vscode from "vscode";
import * as childProcess from "child_process";
import * as fs from "fs";

import Plugin from "@plugin/Plugin";

export default class PHPCBF extends Plugin {
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
        if (this.getShowWarnings()) {
            this.setConfig("show_warnings", "1");
        } else {
            this.setConfig("show_warnings", "0");
        }
        this.setConfig("severity", this.getErrorSeverity().toString());
        this.setConfig("error_severity", this.getErrorSeverity().toString());
        this.setConfig("error_warning", this.getWarningSeverity().toString());
    }

    public showPHPCBFVersion(): void {
        if (!this.getConfig().getFormatConfig().getPhpcbfConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: phpcbf is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCBFExecutablePath = this.getConfig().getFormatConfig().getPhpcbfConfig().getExecutablePath();
        this.log("PHPCBF Executable Path: " + phpCBFExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpCBFExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHPCBF version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
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
        phpcbfCommand += " --standard=" + this.getStandard() + " ";
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
        phpcbfCommand += " --standard=" + this.getStandard() + " ";

        const formatSuccess = await this.execute(phpcbfCommand);

        let fixed = fs.readFileSync(tempFileName, "utf-8");

        return fixed;
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getToolExecutablePath(): string {
        const phpCBFExecutablePath = this.getConfig().getFormatConfig().getPhpcbfConfig().getExecutablePath();
        if (this.isEnabled() && phpCBFExecutablePath) {
            return phpCBFExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcbf is disabled.");
        throw new Error("PHPThunder: phpcbf is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getFormatConfig().getPhpcbfConfig().getEnable();
        }
        return false;
    }
}
