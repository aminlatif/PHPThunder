import * as vscode from "vscode";

import PHPCS from "@plugin/PHPCS";

export default class DocumentActions {
    private plugin: PHPCS;

    constructor(plugin: PHPCS) {
        this.plugin = plugin;
    }

    public runPHPCSOnCurrentDocument(): void {
        this.runPHPCSOnDocument(this.plugin.getCurrentlyOpenTabDocumentPath());
    }

    public async runPHPCSOnDocument(filePath: string): Promise<void> {
        let phpcsCommand = this.plugin.getExceuteBaseCommand();
        phpcsCommand += " --standard=" + this.plugin.getConfig().getPHPCSConfig().getStandard() + " ";
        phpcsCommand += "--no-colors ";
        phpcsCommand += filePath;
        await this.plugin.execute(phpcsCommand);
    }
}