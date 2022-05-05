import * as vscode from "vscode";

import State from "@model/State";
import StateFactory from "@model/factory/StateFactory";

export default class PHPThunder {
    private extensionContext: vscode.ExtensionContext;
    private state: State;

    constructor(extensionContext: vscode.ExtensionContext) {
        console.log("Activating extension: PHPThunder...");
        this.extensionContext = extensionContext;
        this.state = StateFactory.createState(this.extensionContext);
        this.state.getLogService().log("PHPThunder extension activated.", null, 0);
        this.state.getPluginService().initPlugins();
    }

    public getState(): State {
        return this.state;
    }
}
