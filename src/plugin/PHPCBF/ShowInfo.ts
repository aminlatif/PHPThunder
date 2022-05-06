import * as vscode from "vscode";

import PHPCBF from "@plugin/PHPCBF";

export default class ShowInfo {
    private plugin: PHPCBF;

    constructor(plugin: PHPCBF) {
        this.plugin = plugin;
    }

    public showPHPCBFVersion(): void {
        this.plugin.checkIfEnabled();
        const phpExecutablePath = this.plugin.getPluginPHPExecutablePath();
        this.plugin.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCBFExecutablePath = this.plugin.getToolExecutablePath();
        this.plugin.log("PHPCBF Executable Path: " + phpCBFExecutablePath, null, 0);
        this.plugin.execute(phpExecutablePath + " -v", false);
        const command = this.plugin.getExceuteBaseCommand() + " --version";
        this.plugin.execute(command, true);
    }

    public async showPHPBFInstalledCodingStandards(): Promise<void> {
        let phpcbfCommand = this.plugin.getExceuteBaseCommand();
        phpcbfCommand += " -i";
        await this.plugin.execute(phpcbfCommand);
    }
}