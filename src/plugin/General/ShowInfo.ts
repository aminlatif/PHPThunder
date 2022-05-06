import * as vscode from "vscode";

import General from "@plugin/General";

export default class ShowInfo {
    private plugin: General;

    constructor(plugin: General) {
        this.plugin = plugin;
    }

    public showPHPVersion(): void {
        this.plugin.checkIfEnabled();
        const phpExecutablePath = this.plugin.getPHPExecutablePath();
        this.plugin.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const command = phpExecutablePath + " -v";
        this.plugin.execute(command, true);
    }

    public showToolsPHPVersion(): void {
        this.plugin.checkIfEnabled();
        const phpExecutablePath = this.plugin.getToolsPHPExecutablePath();
        this.plugin.log("Tools PHP Executable Path: " + phpExecutablePath, null, 0);
        const command = phpExecutablePath + " -v";
        this.plugin.execute(command, true);
    }
}