import * as vscode from "vscode";
import { DocumentFormattingEditProvider } from "vscode";

import FormatterChain from "@plugin/FormatterChain";

export default class Initializer {
    private plugin: FormatterChain;

    constructor(plugin: FormatterChain) {
        this.plugin = plugin;
    }

    public registerSubscriptions(): void {
        this.plugin.getExtensionContext().subscriptions.concat(this.getAllDisposables());
    }

    public getAllDisposables(): vscode.Disposable[] {
        return [...this.getCommandDisposables(), ...this.getFormattersDisposables()];
    }

    public getCommandDisposables(): vscode.Disposable[] {
        const commandDisposables: vscode.Disposable[] = [];

        const showPHPFormatterChainCommandDisposable: vscode.Disposable = vscode.commands.registerCommand(
            "phpthunder.showPHPFormatterChain",
            () => {
                this.plugin.getShowInfo().showFormatterChain();
            }
        );
        commandDisposables.push(showPHPFormatterChainCommandDisposable);

        return commandDisposables;
    }

    public getFormattersDisposables(): vscode.Disposable[] {
        const formattersDisposables: vscode.Disposable[] = [];

        if (this.plugin.getConfig().getFormatConfig().getPhpFormatter() === "chain") {
            const documentFormattingEditProvider: DocumentFormattingEditProvider = {
                provideDocumentFormattingEdits: (
                    document: vscode.TextDocument,
                    options: vscode.FormattingOptions,
                    token: vscode.CancellationToken
                ) => {
                    return this.plugin.getFormatActions().format(document, options, token);
                },
            };
            const documentFormattingEditProviderDisposable: vscode.Disposable =
                vscode.languages.registerDocumentFormattingEditProvider(
                    { language: "php" },
                    documentFormattingEditProvider
                );
            formattersDisposables.push(documentFormattingEditProviderDisposable);
        }

        return formattersDisposables;
    }

    public init(): void {}
}