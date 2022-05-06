import * as vscode from "vscode";
import * as fs from "fs";

import FormatterChain from "@plugin/FormatterChain";

export default class FormatActions {
    private plugin: FormatterChain;

    constructor(plugin: FormatterChain) {
        this.plugin = plugin;
    }

    format(document: vscode.TextDocument, options: vscode.FormattingOptions, token:vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
        return new Promise(async (resolve, reject) => {
            this.plugin.getState().getPluginService().getPHPCBF().getFormatActions().format(document, options, token);
            resolve([]);
        });
    }
}
