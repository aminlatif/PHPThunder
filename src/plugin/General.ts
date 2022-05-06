import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

import State from "@model/State";
import Initializer from "./General/Initializer";
import ShowInfo from "./General/ShowInfo";

export default class General extends PluginAbstract {
    public pluginName: string = "General";

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
    public getToolExecutablePath(): string {
        throw new Error("PHPThunder: General plugin is not a php tool.");
    }

    public getShowInfo(): ShowInfo {
        return this.showInfo;
    }
}
