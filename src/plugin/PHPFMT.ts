import * as vscode from "vscode";
import * as childProcess from "child_process";

import Plugin from "@plugin/Plugin";

export default class PHPFMT extends Plugin {
    public pluginName: string = "PHPFMT";

    public registerSubscriptionsTool(): void {
        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPFMTVersion", () => {
                this.showPHPFMTVersion();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.phpfmtDocument", () => {
                this.phpFMTCurrentDocument();
            })
        );
    }

    public initTool(): void {}

    public showPHPFMTVersion(): void {
        if (!this.getConfig().getFormatConfig().getPhpfmtConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: phpfmt is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpFMTFixerExecutablePath = this.getConfig().getFormatConfig().getPhpfmtConfig().getExecutablePath();
        this.log("PHPFMT Executable Path: " + phpFMTFixerExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpFMTFixerExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHPFMT version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }

    public phpFMTCurrentDocument(): void {
        this.phpFMTDocument(this.getCurrentlyOpenTabDocumentPath());
    }

    public async phpFMTDocument(filePath: string): Promise<void> {
        let phpfmtCommand = this.getExceuteBaseCommand();
        phpfmtCommand += " --standard=" + this.getStandard() + " ";
        phpfmtCommand += "--no-colors ";
        phpfmtCommand += filePath;
        await this.execute(phpfmtCommand);
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getToolExecutablePath(): string {
        const phpFMTExecutablePath = this.getConfig().getFormatConfig().getPhpfmtConfig().getExecutablePath();
        if (this.isEnabled() && phpFMTExecutablePath) {
            return phpFMTExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpfmt is disabled.");
        throw new Error("PHPThunder: phpfmt is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getFormatConfig().getPhpfmtConfig().getEnable();
        }
        return false;
    }
}
