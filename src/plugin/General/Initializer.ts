import * as vscode from "vscode";

import General from "@plugin/General";

export default class Initializer {
    private plugin: General;

    constructor(plugin: General) {
        this.plugin = plugin;
    }

    public registerSubscriptions(): void {
        this.plugin.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPVersion", () => {
                this.plugin.getShowInfo().showPHPVersion();
            })
        );

        this.plugin.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showToolsPHPVersion", () => {
                this.plugin.getShowInfo().showToolsPHPVersion();
            })
        );
    }

    public init(): void {}
}