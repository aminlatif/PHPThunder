import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import FormatConfig from "@model/Config/FormatConfig";

export default class FormatConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): FormatConfig {
        const formatConfig = new FormatConfig();
        formatConfig.setName("Format Config");
        formatConfig.setEnabled(workspaceConfiguration.get("format.enable", true));
        formatConfig.setDocumentFormattingProviderEnabled(workspaceConfiguration.get("format.documentFormattingProvider", true));
        formatConfig.setFormatOnSaveEnabled(workspaceConfiguration.get("format.onSave", true));
        formatConfig.setFormatOnBracketEnabled(workspaceConfiguration.get("format.onBracket", false));
        formatConfig.setFormatOnSemicolonEnabled(workspaceConfiguration.get("format.onSemicolon", false));
        formatConfig.setFormatHtmlEnabled(workspaceConfiguration.get("format.formatHtml", true));
        formatConfig.setPhpFormatter(workspaceConfiguration.get("format.phpFormatter", "phpcbf"));

        formatConfig.lock();
        return formatConfig;
    }
}
