import * as vscode from "vscode";
import * as fs from "fs";

import PHPFMT from "@plugin/PHPFMT";

export default class FormatActions {
    private plugin: PHPFMT;

    constructor(plugin: PHPFMT) {
        this.plugin = plugin;
    }

    format(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.TextEdit[]> {
        return new Promise(async (resolve, reject) => {
            this.plugin.log("Formatting document: " + document.fileName + " using PHPFMT.");
            const originalText = document.getText();
            const lastLine = document.lineAt(document.lineCount - 1);
            const range = new vscode.Range(new vscode.Position(0, 0), lastLine.range.end);
            const textEdit = new vscode.TextEdit(range, originalText);

            resolve([await this.formatTextEdit(textEdit, options, token)]);
        });
    }

    async formatTextEdit(
        textEdit: vscode.TextEdit,
        options: vscode.FormattingOptions | null = null,
        token: vscode.CancellationToken | null = null
    ): Promise<vscode.TextEdit> {
        const originalText = textEdit.newText;
        const fixedText = await this.plugin.getStringActions().runPHPFMTOnString(originalText);

        if (fixedText.length > 0 && fixedText !== originalText) {
            this.plugin.log("String formatted by PHPFMT.");
            return new vscode.TextEdit(textEdit.range, fixedText);
        } else if (fixedText === originalText) {
            this.plugin.log("PHPFMT made no changes to the string.");
        } else {
            this.plugin.log("String formatting by PHPFMT failed.");
        }

        return textEdit;
    }
}
