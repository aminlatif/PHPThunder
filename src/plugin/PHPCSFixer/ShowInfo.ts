import * as vscode from "vscode";

import PHPCSFixer from "@plugin/PHPCSFixer";

export default class ShowInfo {
    private plugin: PHPCSFixer;

    constructor(plugin: PHPCSFixer) {
        this.plugin = plugin;
    }

    public showPHPCSFixerVersion(): void {
        this.plugin.checkIfEnabled();
        const phpExecutablePath = this.plugin.getPluginPHPExecutablePath();
        this.plugin.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSFixerExecutablePath = this.plugin.getToolExecutablePath();
        this.plugin.log("PHPCSFixer Executable Path: " + phpCSFixerExecutablePath, null, 0);
        this.plugin.execute(phpExecutablePath + " -v", false);
        const command = this.plugin.getExceuteBaseCommand() + " --version";
        this.plugin.execute(command, true);
    }
}