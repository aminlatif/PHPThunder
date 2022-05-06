import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import PluginConfigLoader from "@loader/PluginConfigLoader";
import PHPCSConfig from "../config/PHPCSConfig";

export default class PHPCSConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPCSConfig {
        const phpcsConfig = PluginConfigLoader.load<PHPCSConfig>(workspaceConfiguration, "phpcs", new PHPCSConfig());

        phpcsConfig.setName("PHPCS Plugin Config");
        phpcsConfig.setAutoConfigSearchEnabled(workspaceConfiguration.get("phpcs.autoConfigSearch", false));
        phpcsConfig.setStandard(this.getAbsolutePath(workspaceConfiguration.get<string|null>("phpcs.standard", null)));
        phpcsConfig.setErrorSeverityLevel(workspaceConfiguration.get("phpcs.errorSeverity", 5));
        phpcsConfig.setWarningSeverityLevel(workspaceConfiguration.get("phpcs.warningSeverity", 5));
        phpcsConfig.setShowWarningsEnabled(workspaceConfiguration.get("phpcs.showWarnings", true));
        phpcsConfig.setShowSourcesEnabled(workspaceConfiguration.get("phpcs.showSources", true));
        phpcsConfig.setIgnorePatterns(workspaceConfiguration.get("phpcs.ignorePatterns", []));

        phpcsConfig.lock();
        return phpcsConfig;
    }
}
