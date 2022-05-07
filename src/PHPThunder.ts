import * as vscode from "vscode";

import State from "@model/State";
import StateLoader from "@loader/StateLoader";

export default class PHPThunder {
    private extensionContext: vscode.ExtensionContext;
    private state: State;

    constructor(extensionContext: vscode.ExtensionContext) {
        console.log("Activating extension: PHPThunder...");
        this.extensionContext = extensionContext;
        this.state = new State(extensionContext);
        this.initiate();
        this.registerSubscriptions();
        this.state.getLogService().log("PHPThunder extension activated.", null, 0);
        this.state.getPluginService().initPlugins();
    }

    initiate(): State {
        console.log("Initiating PHPThunder...");
        this.state = StateLoader.load(this.extensionContext, this.state);
        this.state.getLogService().log("PHPThunder extension initiated.", null, 0);
        return this.state;
    }

    registerSubscriptions(): void {
        this.extensionContext.subscriptions.push(
            vscode.workspace.onDidChangeConfiguration((e) => {
                this.state.getLogService().log("PHPThunder extension configuration changed.", null, 0, true);
                this.initiate();
            })
        );
    }

    public getState(): State {
        return this.state;
    }
}
