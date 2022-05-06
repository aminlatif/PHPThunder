import * as vscode from "vscode";

import PHPCS from "@plugin/PHPCS";

export default class Initializer {
    private plugin: PHPCS;

    constructor(plugin: PHPCS) {
        this.plugin = plugin;
    }

    public registerSubscriptions(): void {
        this.plugin.getExtensionContext().subscriptions.concat(this.getAllDisposables());
    }

    public getAllDisposables(): vscode.Disposable[] {
        return [...this.getCommandDisposables()];
    }

    public getCommandDisposables(): vscode.Disposable[] {
        const commandDisposables: vscode.Disposable[] =[];

        const showPHPCSVersionCommandDisposable: vscode.Disposable = vscode.commands.registerCommand("phpthunder.showPHPCSVersion", () => {
            this.plugin.getShowInfo().showPHPCSVersion();
        });
        commandDisposables.push(showPHPCSVersionCommandDisposable);

        const showPHPCSInstalledCodingStandardsCommandDisposable: vscode.Disposable = vscode.commands.registerCommand("phpthunder.showPHPCSInstalledCodingStandards", () => {
            this.plugin.getShowInfo().showPHPCSInstalledCodingStandards();
        });
        commandDisposables.push(showPHPCSInstalledCodingStandardsCommandDisposable);

        const phpcsDocumentCommandDisposable: vscode.Disposable = vscode.commands.registerCommand("phpthunder.phpcsDocument", () => {
            this.plugin.getDocumentActions().runPHPCSOnCurrentDocument();
        });
        commandDisposables.push(phpcsDocumentCommandDisposable);

        return commandDisposables;
    }

    public init(): void {
        this.plugin.setConfig("report_format", "full");
        if (this.plugin.getConfig().getPHPCSConfig().isShowWarningsEnabled()) {
            this.plugin.setConfig("show_warnings", "1");
        } else {
            this.plugin.setConfig("show_warnings", "0");
        }
        this.plugin.setConfig("severity", this.plugin.getConfig().getPHPCSConfig().getErrorSeverityLevel().toString());
        this.plugin.setConfig("error_severity", this.plugin.getConfig().getPHPCSConfig().getErrorSeverityLevel().toString());
        this.plugin.setConfig("error_warning", this.plugin.getConfig().getPHPCSConfig().getWarningSeverityLevel().toString());
    }
}