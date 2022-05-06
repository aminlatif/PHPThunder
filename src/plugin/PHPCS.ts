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

import PluginAbstract from "@interface/PluginAbstract";

export default class PHPCS extends PluginAbstract {
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
        if (this.getConfig().getPHPCSConfig().isShowWarningsEnabled()) {
            this.setConfig("show_warnings", "1");
        } else {
            this.setConfig("show_warnings", "0");
        }
        this.setConfig("severity", this.getConfig().getPHPCSConfig().getErrorSeverityLevel().toString());
        this.setConfig("error_severity", this.getConfig().getPHPCSConfig().getErrorSeverityLevel().toString());
        this.setConfig("error_warning", this.getConfig().getPHPCSConfig().getWarningSeverityLevel().toString());
    }

    public showPHPCSVersion(): void {
        this.checkIfEnabled();
        const phpExecutablePath = this.getPluginPHPExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSExecutablePath = this.getToolExecutablePath;
        this.log("PHPCS Executable Path: " + phpCSExecutablePath, null, 0);
        this.execute(phpExecutablePath + " -v", false);
        const command = this.getExceuteBaseCommand() + " --version";
        this.execute(command, true);
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
        phpcsCommand += " --standard=" + this.getConfig().getPHPCSConfig().getStandard() + " ";
        phpcsCommand += "--no-colors ";
        phpcsCommand += filePath;
        await this.execute(phpcsCommand);
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getPluginPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getPHPCSConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpCSExecutablePath = this.getConfig().getPHPCSConfig().getExecutablePath();
        if (this.isEnabled() && phpCSExecutablePath) {
            return phpCSExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcs is disabled.");
        throw new Error("PHPThunder: phpcs is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPCSConfig().isEnabled();
        }
        return false;
    }
}
