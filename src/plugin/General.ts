import * as vscode from "vscode";
import * as childProcess from "child_process";

import Plugin from "@plugin/Plugin";

export default class Genral extends Plugin {
    public pluginName: string = "General";

    public registerSubscriptionsTool(): void {
        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPVersion", () => {
                this.showPHPVersion();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showComposerVersion", () => {
                this.showComposerVersion();
            })
        );
    }

    public initTool(): void {}

    public showPHPVersion(): void {
        if (!this.getConfig().isEnable()) {
            vscode.window.showWarningMessage("PHPThunder is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " -v", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHP version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }

    public showComposerVersion(): void {
        if (!this.getConfig().isEnable()) {
            vscode.window.showWarningMessage("PHPThunder is disabled.");
            return;
        }
        if (this.getConfig().getComposerExecutablePath() === null) {
            vscode.window.showWarningMessage("PHPThunder: composer executable path not defined.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const composerExecutablePath = this.getConfig().getComposerExecutablePath();
        this.log("Composer Executable Path: " + composerExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + composerExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                this.log(err.toString(), null, 2);
                this.log(stderr.toString(), null, 2);
                this.log(stdout.toString(), null, 2);
                return;
            }
            const message = "Composer version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }
}
