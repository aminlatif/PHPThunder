import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

export default class PHPFMT extends PluginAbstract {
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
        this.checkIfEnabled();
        const phpExecutablePath = this.getPluginPHPExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpFMTExecutablePath = this.getToolExecutablePath;
        this.log("PHPFMT Executable Path: " + phpFMTExecutablePath, null, 0);
        this.execute(phpExecutablePath + " -v", false);
        const command = this.getExceuteBaseCommand() + " --version";
        this.execute(command, true);
    }

    public phpFMTCurrentDocument(): void {
        this.phpFMTDocument(this.getCurrentlyOpenTabDocumentPath());
    }

    public async phpFMTDocument(filePath: string): Promise<void> {
        let phpfmtCommand = this.getExceuteBaseCommand();
        // phpfmtCommand += " --standard=" + this.getStandard() + " ";
        phpfmtCommand += "--no-colors ";
        phpfmtCommand += filePath;
        await this.execute(phpfmtCommand);
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getPluginPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getPHPFMTConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpFMTExecutablePath = this.getConfig().getPHPFMTConfig().getExecutablePath();
        if (this.isEnabled() && phpFMTExecutablePath) {
            return phpFMTExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpfmt is disabled.");
        throw new Error("PHPThunder: phpfmt is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPFMTConfig().isEnabled();
        }
        return false;
    }
}
