import * as vscode from "vscode";

import PHPCS from "@plugin/PHPCS";

export default class ShowInfo {
    private plugin: PHPCS;

    constructor(plugin: PHPCS) {
        this.plugin = plugin;
    }

    public showPHPCSVersion(): void {
        this.plugin.checkIfEnabled();
        const phpExecutablePath = this.plugin.getPluginPHPExecutablePath();
        this.plugin.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSExecutablePath = this.plugin.getToolExecutablePath();
        this.plugin.log("PHPCS Executable Path: " + phpCSExecutablePath, null, 0);
        this.plugin.execute(phpExecutablePath + " -v", false);
        const command = this.plugin.getExceuteBaseCommand() + " --version";
        this.plugin.execute(command, true);
    }

    public async showPHPCSInstalledCodingStandards(): Promise<void> {
        let phpcsCommand = this.plugin.getExceuteBaseCommand();
        phpcsCommand += " -i";
        await this.plugin.execute(phpcsCommand);
    }
}