import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

export default class PHPCSFixer extends PluginAbstract {
    public pluginName: string = "PHPCSFixer";

    public registerSubscriptionsTool(): void {
        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPCSFixerVersion", () => {
                this.showPHPCSFixerVersion();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.phpcsfixerDocument", () => {
                this.phpCSFixerCurrentDocument();
            })
        );
    }

    public initTool(): void {}

    public showPHPCSFixerVersion(): void {
        this.checkIfEnabled();
        const phpExecutablePath = this.getPluginPHPExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSFixerExecutablePath = this.getToolExecutablePath;
        this.log("PHPCSFixer Executable Path: " + phpCSFixerExecutablePath, null, 0);
        this.execute(phpExecutablePath + " -v", false);
        const command = this.getExceuteBaseCommand() + " --version";
        this.execute(command, true);
    }

    public phpCSFixerCurrentDocument(): void {
        this.phpCSFixerDocument(this.getCurrentlyOpenTabDocumentPath());
    }

    public async phpCSFixerDocument(filePath: string): Promise<void> {
        let phpcsfixerCommand = this.getExceuteBaseCommand();
        // phpcsfixerCommand += " --standard=" + this.getConfig().getPHPCSFixerConfig().getStandard() + " ";
        phpcsfixerCommand += "--no-colors ";
        phpcsfixerCommand += filePath;
        await this.execute(phpcsfixerCommand);
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getPluginPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getPHPCSFixerConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpCSFixerExecutablePath = this.getConfig().getPHPCSFixerConfig().getExecutablePath();
        if (this.isEnabled() && phpCSFixerExecutablePath) {
            return phpCSFixerExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcsfixer is disabled.");
        throw new Error("PHPThunder: phpcsfixer is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPCSFixerConfig().isEnabled();
        }
        return false;
    }
}
