import * as vscode from "vscode";
import * as childProcess from "child_process";

import Plugin from "@plugin/Plugin";

export default class PHPCSFixer extends Plugin {
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
        if (!this.getConfig().getFormatConfig().getPhpcsfixerConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: php-cs-fixer is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSFixerExecutablePath = this.getConfig().getFormatConfig().getPhpcsfixerConfig().getExecutablePath();
        this.log("PHP-CS-Fixer Executable Path: " + phpCSFixerExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpCSFixerExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHP-CS-Fixer version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }

    public phpCSFixerCurrentDocument(): void {
        this.phpCSFixerDocument(this.getCurrentlyOpenTabDocumentPath());
    }

    public async phpCSFixerDocument(filePath: string): Promise<void> {
        let phpcsfixerCommand = this.getExceuteBaseCommand();
        phpcsfixerCommand += " --standard=" + this.getStandard() + " ";
        phpcsfixerCommand += "--no-colors ";
        phpcsfixerCommand += filePath;
        await this.execute(phpcsfixerCommand);
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getToolExecutablePath(): string {
        const phpCSFixerExecutablePath = this.getConfig().getFormatConfig().getPhpcsfixerConfig().getExecutablePath();
        if (this.isEnabled() && phpCSFixerExecutablePath) {
            return phpCSFixerExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcsfixer is disabled.");
        throw new Error("PHPThunder: phpcsfixer is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getFormatConfig().getPhpcsfixerConfig().getEnable();
        }
        return false;
    }
}
