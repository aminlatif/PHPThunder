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
            reject();
        });
    }
}
