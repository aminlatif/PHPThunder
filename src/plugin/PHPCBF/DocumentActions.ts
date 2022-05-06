import * as vscode from "vscode";

import PHPCBF from "@plugin/PHPCBF";

export default class DocumentActions {
    private plugin: PHPCBF;

    constructor(plugin: PHPCBF) {
        this.plugin = plugin;
    }

    public runPHPCBFOnCurrentDocument(): void {
        this.runPHPCBFOnDocument(this.plugin.getCurrentlyOpenTabDocumentPath());
    }

    public async runPHPCBFOnDocument(filePath: string): Promise<void> {
        let phpcbfCommand = this.plugin.getExceuteBaseCommand();
        phpcbfCommand += " --standard=" + this.plugin.getConfig().getPHPCBFConfig().getStandard() + " ";
        phpcbfCommand += "--no-colors ";
        phpcbfCommand += filePath;
        await this.plugin.execute(phpcbfCommand);
    }

    public async formatVSCodeDocumentUsingPHPCBF(document: vscode.TextDocument): Promise<string> {
        this.plugin.log("Formatting document: " + document.fileName);
        const text = document.getText();
        const fixedText = await this.plugin.getStringActions().runPHPCBFOnString(text);
        return fixedText;
    }

}