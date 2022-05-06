import * as vscode from "vscode";

import Composer from "@plugin/Composer";

export default class ShowInfo {
    private plugin: Composer;

    constructor(plugin: Composer) {
        this.plugin = plugin;
    }

    public showComposerVersion(): void {
        this.plugin.checkIfEnabled();
        const phpExecutablePath = this.plugin.getPluginPHPExecutablePath();
        this.plugin.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const composerExecutablePath = this.plugin.getToolExecutablePath();
        this.plugin.log("Composer Executable Path: " + composerExecutablePath, null, 0);
        this.plugin.execute(phpExecutablePath + " -v", false);
        const command = this.plugin.getExceuteBaseCommand() + " --version";
        this.plugin.execute(command, true);
    }
}