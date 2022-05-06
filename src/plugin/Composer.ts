import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

import State from "@model/State";
import Initializer from "./Composer/Initializer";
import ShowInfo from "./Composer/ShowInfo";

export default class Composer extends PluginAbstract {
    public pluginName: string = "Composer";

    public initializer: Initializer;
    public showInfo:ShowInfo;

    constructor(extensionContext: vscode.ExtensionContext, state: State) {
        super(extensionContext, state);
        this.initializer = new Initializer(this);
        this.showInfo = new ShowInfo(this);
    }

    public registerSubscriptionsTool(): void {
        this.initializer.registerSubscriptions();
    }

    public initTool(): void {
        this.initializer.init();
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

    public getShowInfo(): ShowInfo {
        return this.showInfo;
    }
}
