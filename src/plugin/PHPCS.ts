import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    Middleware,
    Proposed,
    ProposedFeatures,
    ServerOptions,
    TransportKind,
} from "vscode-languageclient";
import * as childProcess from "child_process";
import * as path from "path";

import Plugin from "@plugin/Plugin";

export default class PHPCS extends Plugin {
    public pluginName: string = "PHPCS";

    public registerSubscriptionsTool(): void {
        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPCSVersion", () => {
                this.showPHPCSVersion();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.showPHPCSInstalledCodingStandards", () => {
                this.showPHPCSInstalledCodingStandards();
            })
        );

        this.getExtensionContext().subscriptions.push(
            vscode.commands.registerCommand("phpthunder.phpcsDocument", () => {
                this.phpCSCurrentDocument();
            })
        );
    }

    public initTool(): void {
        this.setConfig("report_format", "full");
        if (this.getShowWarnings()) {
            this.setConfig("show_warnings", "1");
        } else {
            this.setConfig("show_warnings", "0");
        }
        this.setConfig("severity", this.getErrorSeverity().toString());
        this.setConfig("error_severity", this.getErrorSeverity().toString());
        this.setConfig("error_warning", this.getWarningSeverity().toString());
    }

    public showPHPCSVersion(): void {
        if (!this.getConfig().getFormatConfig().getPhpcsConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: phpcs is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSExecutablePath = this.getConfig().getFormatConfig().getPhpcsConfig().getExecutablePath();
        this.log("PHPCS Executable Path: " + phpCSExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpCSExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                this.log(err.toString(), null, 2);
                this.log(stderr.toString(), null, 2);
                this.log(stdout.toString(), null, 2);
                return;
            }
            const message = "PHPCS version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }

    public async showPHPCSInstalledCodingStandards(): Promise<void> {
        let phpcsCommand = this.getExceuteBaseCommand();
        phpcsCommand += " -i";
        await this.execute(phpcsCommand);
    }

    public phpCSCurrentDocument(): void {
        this.phpCSDocument(this.getCurrentlyOpenTabDocumentPath());
    }

    public async phpCSDocument(filePath: string): Promise<void> {
        let phpcsCommand = this.getExceuteBaseCommand();
        phpcsCommand += " --standard=" + this.getStandard() + " ";
        phpcsCommand += "--no-colors ";
        phpcsCommand += filePath;
        await this.execute(phpcsCommand);
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getToolExecutablePath(): string {
        const phpCSExecutablePath = this.getConfig().getFormatConfig().getPhpcsConfig().getExecutablePath();
        if (this.isEnabled() && phpCSExecutablePath) {
            return phpCSExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcs is disabled.");
        throw new Error("PHPThunder: phpcs is disabled.");
    }
}
