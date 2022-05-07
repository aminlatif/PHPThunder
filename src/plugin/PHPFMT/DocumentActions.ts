import * as vscode from "vscode";

import PHPFMT from "@plugin/PHPFMT";

export default class DocumentActions {
    private plugin: PHPFMT;

    constructor(plugin: PHPFMT) {
        this.plugin = plugin;
    }

    public runPHPFMTOnCurrentDocument(): void {
        this.runPHPFMTOnDocument(this.plugin.getCurrentlyOpenTabDocumentPath());
    }

    public async runPHPFMTOnDocument(filePath: string): Promise<void> {
        let phpfmtCommand = this.plugin.getExceuteBaseCommand();
        // phpfmtCommand += " --standard=" + this.getStandard() + " ";
        // phpfmtCommand += "--no-colors ";
        if(this.plugin.getConfig().getPHPFMTConfig().getConfigFilePath()) {
            phpfmtCommand += " --config=" + this.plugin.getConfig().getPHPFMTConfig().getConfigFilePath();
        }
        phpfmtCommand += " -v";
        phpfmtCommand += " " + filePath;
        await this.plugin.execute(phpfmtCommand);
    }
}