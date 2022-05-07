import * as vscode from "vscode";
import * as fs from "fs";

import FormatterChain from "@plugin/FormatterChain";
import { option } from "yargs";

export default class FormatActions {
    private plugin: FormatterChain;

    constructor(plugin: FormatterChain) {
        this.plugin = plugin;
    }

    format(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.TextEdit[]> {
        return new Promise(async (resolve, reject) => {
            this.plugin.log(
                "Formatting document " + document.fileName + " using chain ",
                this.plugin.getConfig().getFormatConfig().getPhpFormatterChain()
            );
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
        const formatterChain = this.plugin.getConfig().getFormatConfig().getPhpFormatterChain();
        let fixedText = textEdit;
        for (let i = 0; i < formatterChain.length; i++) {
            const formatter = formatterChain[i];
            const step = i + 1;
            this.plugin.log("Chain step " + step + ": " + formatter);
            fixedText = await this.formatTextEditByFormatter(textEdit, options, token, formatter);
        }
        return fixedText;
    }

    async formatTextEditByFormatter(
        textEdit: vscode.TextEdit,
        options: vscode.FormattingOptions | null = null,
        token: vscode.CancellationToken | null = null,
        formatterName: string = "phpcbf"
    ): Promise<vscode.TextEdit> {
        if (formatterName === "phpcbf") {
            return await this.plugin
                .getState()
                .getPluginService()
                .getPHPCBF()
                .getFormatActions()
                .formatTextEdit(textEdit, options, token);
        } else if (formatterName === "php-cs-fixer") {
            return await this.plugin
                .getState()
                .getPluginService()
                .getPHPCSFixer()
                .getFormatActions()
                .formatTextEdit(textEdit, options, token);
        } else if (formatterName === "phpfmt") {
            return await this.plugin
                .getState()
                .getPluginService()
                .getPHPFMT()
                .getFormatActions()
                .formatTextEdit(textEdit, options, token);
        }

        return textEdit;
    }
}
