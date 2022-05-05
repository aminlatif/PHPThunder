import * as vscode from "vscode";

import Config from "@model/Config";
import FormatConfig from "@model/Config/FormatConfig";
import PHPCBFConfig from "@plugin/PHPCBF/PHPCBFConfig";
import PHPCSConfig from "@plugin/PHPCS/PHPCSConfig";
import PHPCSFixerConfig from "@plugin/PHPCSFixer/PHPCSFixerConfig";
import PHPFMTConfig from "@plugin/PHPFMT/PHPFMTConfig";

export default class ConfigFactory {
    public static createConfig(workspaceConfiguration: vscode.WorkspaceConfiguration): Config {
        const enable = workspaceConfiguration.get("enable", true);
        const phpExecutablePath = this.getExecutablePath(
            workspaceConfiguration.get("phpExecutablePath", "/usr/bin/php")
        );
        const composerExecutablePath = this.getExecutablePath(
            workspaceConfiguration.get("composerExecutablePath", null)
        );
        const debug = workspaceConfiguration.get("debug", false);
        const composerJsonPath = this.getExecutablePath(workspaceConfiguration.get("composerJsonPath", null));
        const formatConfig = this.createFormatConfig(workspaceConfiguration);
        return new Config(enable, phpExecutablePath, composerExecutablePath, debug, composerJsonPath, formatConfig);
    }

    public static createFormatConfig(workspaceConfiguration: vscode.WorkspaceConfiguration): FormatConfig {
        const enable = workspaceConfiguration.get("format.enable", false);
        const onSave = workspaceConfiguration.get("format.onSave", false);
        const onBracket = workspaceConfiguration.get("format.onBracket", false);
        const onSemicolon = workspaceConfiguration.get("format.onSemicolon", false);
        const formatHtml = workspaceConfiguration.get("format.formatHtml", false);
        const documentFormattingProvider = workspaceConfiguration.get("format.documentFormattingProvider", false);
        let standard = this.getExecutablePath(workspaceConfiguration.get("format.standard", "PSR12"));
        const autoConfigSearch = workspaceConfiguration.get("format.autoConfigSearch", false);
        const ignorePatterns = workspaceConfiguration.get("format.ignorePatterns", []);
        const errorSeverity = workspaceConfiguration.get("format.errorSeverity", 5);
        const warningSeverity = workspaceConfiguration.get("format.warningSeverity", 5);
        const showWarnings = workspaceConfiguration.get("format.showWarnings", false);
        const showSources = workspaceConfiguration.get("format.showSources", false);
        const traceServer = workspaceConfiguration.get("format.traceServer", "off");
        const phpcsConfig = this.createPhpCSConfig(workspaceConfiguration);
        const phpcbfConfig = this.createPhpCBFConfig(workspaceConfiguration);
        const phpcsfixerConfig = this.createPhpCSFixerFConfig(workspaceConfiguration);
        const phpfmtConfig = this.createPhpFMTConfig(workspaceConfiguration);

        if(standard === null) {
            standard = "PSR12";
        }
        return new FormatConfig(
            enable,
            onSave,
            onBracket,
            onSemicolon,
            formatHtml,
            documentFormattingProvider,
            standard,
            autoConfigSearch,
            ignorePatterns,
            errorSeverity,
            warningSeverity,
            showWarnings,
            showSources,
            traceServer,
            phpcsConfig,
            phpcbfConfig,
            phpcsfixerConfig,
            phpfmtConfig
        );
    }

    public static createPhpCSConfig(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPCSConfig {
        const enable = workspaceConfiguration.get("format.phpcs.enable", false);
        const executablePath = this.getExecutablePath(workspaceConfiguration.get("format.phpcs.executablePath", null));
        return new PHPCSConfig(enable, executablePath);
    }

    public static createPhpCBFConfig(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPCBFConfig {
        const enable = workspaceConfiguration.get("format.phpcbf.enable", false);
        const executablePath = this.getExecutablePath(workspaceConfiguration.get("format.phpcbf.executablePath", null));
        return new PHPCBFConfig(enable, executablePath);
    }

    public static createPhpCSFixerFConfig(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPCSFixerConfig {
        const enable = workspaceConfiguration.get("format.phpcsfixer.enable", false);
        const executablePath = this.getExecutablePath(
            workspaceConfiguration.get("format.phpcsfixer.executablePath", null)
        );
        const allowRisky = workspaceConfiguration.get("format.phpcsfixer.allowRisky", false);
        return new PHPCSFixerConfig(enable, executablePath, allowRisky);
    }

    public static createPhpFMTConfig(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPFMTConfig {
        const enable = workspaceConfiguration.get("format.phpfmt.enable", false);
        const executablePath = this.getExecutablePath(workspaceConfiguration.get("format.phpfmt.executablePath", null));
        return new PHPFMTConfig(enable, executablePath);
    }

    public static getExecutablePath(configPath: string | null): string | null {
        if (configPath === null) {
            return null;
        }
        let modifiedPath = configPath;
        modifiedPath = modifiedPath.replace(/\$\{workspaceFolder\}/g, this.getDocumentWorkspaceFolder() || "");
        if (modifiedPath.startsWith("./")) {
            modifiedPath = this.getDocumentWorkspaceFolder() + modifiedPath.substring(1);
        }
        if (!modifiedPath.startsWith("/")) {
            if (modifiedPath.includes("/") || modifiedPath.includes(".")) {
                modifiedPath = this.getDocumentWorkspaceFolder() + "/" + modifiedPath;
            }
        }
        return modifiedPath;
    }

    public static getDocumentWorkspaceFolder(): string | undefined {
        const fileName = vscode.window.activeTextEditor?.document.fileName;
        return vscode.workspace.workspaceFolders
            ?.map((folder) => folder.uri.fsPath)
            .filter((fsPath) => fileName?.startsWith(fsPath))[0];
    }
}
