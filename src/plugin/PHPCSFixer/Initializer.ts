import * as vscode from "vscode";
import { DocumentFormattingEditProvider } from "vscode";

import PHPCSFixer from "@plugin/PHPCSFixer";

export default class Initializer {
    private plugin: PHPCSFixer;

    constructor(plugin: PHPCSFixer) {
        this.plugin = plugin;
    }

    public registerSubscriptions(): void {
        this.plugin.getExtensionContext().subscriptions.concat(this.getAllDisposables());
    }

    public getAllDisposables(): vscode.Disposable[] {
        return [...this.getCommandDisposables(), ...this.getFormattersDisposables()];
    }

    public getCommandDisposables(): vscode.Disposable[] {
        const commandDisposables: vscode.Disposable[] =[];

        const showPHPCSFixerVersionCommandDisposable: vscode.Disposable = vscode.commands.registerCommand("phpthunder.showPHPCSFixerVersion", () => {
            this.plugin.getShowInfo().showPHPCSFixerVersion();
        });
        commandDisposables.push(showPHPCSFixerVersionCommandDisposable);

        const phpcsfixerDocumentCommandDisposable: vscode.Disposable = vscode.commands.registerCommand("phpthunder.phpcsfixerDocument", () => {
            this.plugin.getDocumentActions().runPHPCSFixerOnCurrentDocument();
        });
        commandDisposables.push(phpcsfixerDocumentCommandDisposable);

        return commandDisposables;
    }

    public getFormattersDisposables(): vscode.Disposable[] {
        const formattersDisposables: vscode.Disposable[] =[];

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
            vscode.languages.registerDocumentFormattingEditProvider({language: "php"}, documentFormattingEditProvider);
        formattersDisposables.push(documentFormattingEditProviderDisposable);

        return formattersDisposables;
    }

    public init(): void {}
}
