import * as vscode from "vscode";
import * as fs from "fs";

import PHPCSFixer from "@plugin/PHPCSFixer";

export default class FormatActions {
    private plugin: PHPCSFixer;

    constructor(plugin: PHPCSFixer) {
        this.plugin = plugin;
    }

    format(document: vscode.TextDocument, options: vscode.FormattingOptions, token:vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
        return new Promise(async (resolve, reject) => {
            reject();
        });
    }
}
