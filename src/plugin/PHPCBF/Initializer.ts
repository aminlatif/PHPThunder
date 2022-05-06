import * as vscode from "vscode";
import { DocumentFormattingEditProvider } from "vscode";

import PHPCBF from "@plugin/PHPCBF";

export default class Initializer {
    private plugin: PHPCBF;

    constructor(plugin: PHPCBF) {
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

        const showPHPCBFVersionCommandDisposable: vscode.Disposable = vscode.commands.registerCommand(
            "phpthunder.showPHPCBFVersion",
            () => {
                this.plugin.getShowInfo().showPHPCBFVersion();
            }
        );
        commandDisposables.push(showPHPCBFVersionCommandDisposable);

        const showPHPCBFInstalledCodingStandardsCommandDisposable: vscode.Disposable = vscode.commands.registerCommand(
            "phpthunder.showPHPCBFInstalledCodingStandards",
            () => {
                this.plugin.getShowInfo().showPHPBFInstalledCodingStandards();
            }
        );
        commandDisposables.push(showPHPCBFInstalledCodingStandardsCommandDisposable);

        const phpcbfDocumentCommandDisposable: vscode.Disposable = vscode.commands.registerCommand(
            "phpthunder.phpcbfDocument",
            () => {
                this.plugin.getDocumentActions().runPHPCBFOnCurrentDocument();
            }
        );
        commandDisposables.push(phpcbfDocumentCommandDisposable);

        return commandDisposables;
    }

    public getFormattersDisposables(): vscode.Disposable[] {
        const formattersDisposables: vscode.Disposable[] = [];

        if (this.plugin.getConfig().getFormatConfig().getPhpFormatter() === "phpcbf") {
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

    public init(): void {
        this.plugin.setConfig("report_format", "full");
        if (this.plugin.getConfig().getPHPCBFConfig().isShowWarningsEnabled()) {
            this.plugin.setConfig("show_warnings", "1");
        } else {
            this.plugin.setConfig("show_warnings", "0");
        }
        this.plugin.setConfig("severity", this.plugin.getConfig().getPHPCBFConfig().getErrorSeverityLevel().toString());
        this.plugin.setConfig(
            "error_severity",
            this.plugin.getConfig().getPHPCBFConfig().getErrorSeverityLevel().toString()
        );
        this.plugin.setConfig(
            "error_warning",
            this.plugin.getConfig().getPHPCBFConfig().getWarningSeverityLevel().toString()
        );
    }
}
