import * as vscode from "vscode";
import { DocumentFormattingEditProvider } from "vscode";

import PHPFMT from "@plugin/PHPFMT";

export default class Initializer {
    private plugin: PHPFMT;

    constructor(plugin: PHPFMT) {
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

        const showPHPFMTVersionCommandDisposable: vscode.Disposable = vscode.commands.registerCommand(
            "phpthunder.showPHPFMTVersion",
            () => {
                this.plugin.getShowInfo().showPHPFMTVersion();
            }
        );
        commandDisposables.push(showPHPFMTVersionCommandDisposable);

        const phpfmtDocumentCommandDisposable: vscode.Disposable = vscode.commands.registerCommand(
            "phpthunder.phpfmtDocument",
            () => {
                this.plugin.getDocumentActions().runPHPFMTOnCurrentDocument();
            }
        );
        commandDisposables.push(phpfmtDocumentCommandDisposable);

        return commandDisposables;
    }

    public getFormattersDisposables(): vscode.Disposable[] {
        const formattersDisposables: vscode.Disposable[] = [];

        if (this.plugin.getConfig().getFormatConfig().getPhpFormatter() === "phpfmt") {
            const documentFormattingEditProvider: DocumentFormattingEditProvider = {
                provideDocumentFormattingEdits: (
                    document: vscode.TextDocument,
                    options: vscode.FormattingOptions,
                    token: vscode.CancellationToken
                ) => {
                    this.plugin.log("salam", null, 2, true);
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
