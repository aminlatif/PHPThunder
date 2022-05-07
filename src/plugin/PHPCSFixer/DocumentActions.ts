import * as vscode from "vscode";

import PHPCSFixer from "@plugin/PHPCSFixer";

export default class DocumentActions {
    private plugin: PHPCSFixer;

    constructor(plugin: PHPCSFixer) {
        this.plugin = plugin;
    }

    public runPHPCSFixerOnCurrentDocument(): void {
        this.runPHPCSFixerOnDocument(this.plugin.getCurrentlyOpenTabDocumentPath());
    }

    public async runPHPCSFixerOnDocument(filePath: string): Promise<void> {
        let phpcsfixerCommand = this.plugin.getExceuteBaseCommand();
        // phpcsfixerCommand += " --standard=" + this.getConfig().getPHPCSFixerConfig().getStandard() + " ";
        // phpcsfixerCommand += "--no-colors ";
        phpcsfixerCommand += " fix " + filePath;
        if(this.plugin.getConfig().getPHPCSFixerConfig().getConfigFilePath()) {
            phpcsfixerCommand += " --config=" + this.plugin.getConfig().getPHPCSFixerConfig().getConfigFilePath();
        }
        await this.plugin.execute(phpcsfixerCommand);
    }
}