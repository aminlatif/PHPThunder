import * as vscode from "vscode";

import Composer from "@plugin/Composer";

export default class Initializer {
    private plugin: Composer;

    constructor(plugin: Composer) {
        this.plugin = plugin;
    }

    public registerSubscriptions(): void {
        this.plugin.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showComposerVersion", () => {
                this.plugin.getShowInfo().showComposerVersion();
            })
        );
    }

    public init(): void {}
}