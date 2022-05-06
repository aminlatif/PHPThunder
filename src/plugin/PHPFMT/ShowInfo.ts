import * as vscode from "vscode";

import PHPFMT from "@plugin/PHPFMT";

export default class ShowInfo {
    private plugin: PHPFMT;

    constructor(plugin: PHPFMT) {
        this.plugin = plugin;
    }

    public showPHPFMTVersion(): void {
        this.plugin.checkIfEnabled();
        const phpExecutablePath = this.plugin.getPluginPHPExecutablePath();
        this.plugin.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpFMTExecutablePath = this.plugin.getToolExecutablePath();
        this.plugin.log("PHPFMT Executable Path: " + phpFMTExecutablePath, null, 0);
        this.plugin.execute(phpExecutablePath + " -v", false);
        const command = this.plugin.getExceuteBaseCommand() + " --version";
        this.plugin.execute(command, true);
    }
}