import * as vscode from "vscode";
import * as fs from "fs";

import PHPCBF from "@plugin/PHPCBF";

export default class FormatActions {
    private plugin: PHPCBF;

    constructor(plugin: PHPCBF) {
        this.plugin = plugin;
    }

    format(document: vscode.TextDocument, options: vscode.FormattingOptions, token:vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
        return new Promise(async (resolve, reject) => {
            this.plugin.log("Formatting document: " + document.fileName);
            const originalText = document.getText();
            let lastLine = document.lineAt(document.lineCount - 1);
            let range = new vscode.Range(new vscode.Position(0, 0), lastLine.range.end);
            const fixedText = await this.plugin.getDocumentActions().formatVSCodeDocumentUsingPHPCBF(document);
            if (fixedText.length > 0 && fixedText !== originalText) {
                this.plugin.log("Document: " + document.fileName + " - formatted.");
                resolve([new vscode.TextEdit(range, fixedText)]);
            } else if (fixedText === originalText) {
                this.plugin.log("Document: " + document.fileName + " - no changes made.");
                resolve([]);
            } else {
                this.plugin.log("Document: " + document.fileName + " - formatting failed.");
            }
            reject();
        });
    }
}
