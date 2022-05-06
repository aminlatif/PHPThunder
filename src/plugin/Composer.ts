import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

export default class Composer extends PluginAbstract {
    public pluginName: string = "Composer";

    public registerSubscriptionsTool(): void {
        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showComposerVersion", () => {
                this.showComposerVersion();
            })
        );
    }

    public initTool(): void {}

    public showComposerVersion(): void {
        this.checkIfEnabled();
        const phpExecutablePath = this.getPluginPHPExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const composerExecutablePath = this.getToolExecutablePath();
        this.log("Composer Executable Path: " + composerExecutablePath, null, 0);
        this.execute(phpExecutablePath + " -v", false);
        const command = this.getExceuteBaseCommand() + " --version";
        this.execute(command, true);
    }

    public getPluginPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getComposerConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const composerFExecutablePath = this.getConfig().getComposerConfig().getExecutablePath();
        if (this.isEnabled() && composerFExecutablePath) {
            return composerFExecutablePath;
        }
        this.log("PHPThunder: composer is disabled.", null, 1, true);
        throw new Error("PHPThunder: composer is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getComposerConfig().isEnabled();
        }
        return false;
    }
}
