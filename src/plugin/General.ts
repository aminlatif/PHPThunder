import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

export default class General extends PluginAbstract {
    public pluginName: string = "General";

    public registerSubscriptionsTool(): void {
        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPVersion", () => {
                this.showPHPVersion();
            })
        );
    }

    public initTool(): void {}

    public showPHPVersion(): void {
        this.checkIfEnabled();
        const phpExecutablePath = this.getPHPExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const command = phpExecutablePath + " -v";
        this.execute(command, true);
    }

    public getToolExecutablePath(): string {
        throw new Error("PHPThunder: General plugin is not a php tool.");
    }
}
