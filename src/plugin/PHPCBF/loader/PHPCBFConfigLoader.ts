import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import PluginConfigLoader from "@loader/PluginConfigLoader";
import PHPCBFConfig from "../config/PHPCBFConfig";

export default class PHPCBFConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPCBFConfig {
        const phpcbfConfig = PluginConfigLoader.load<PHPCBFConfig>(workspaceConfiguration, "phpcbf", new PHPCBFConfig());

        phpcbfConfig.setName("PHPCS Plugin Config");
        phpcbfConfig.setAutoConfigSearchEnabled(workspaceConfiguration.get("phpcs.autoConfigSearch", false));
        phpcbfConfig.setStandard(this.getAbsolutePath(workspaceConfiguration.get<string|null>("phpcs.standard", null)));
        phpcbfConfig.setErrorSeverityLevel(workspaceConfiguration.get("phpcs.errorSeverity", 5));
        phpcbfConfig.setWarningSeverityLevel(workspaceConfiguration.get("phpcs.warningSeverity", 5));
        phpcbfConfig.setShowWarningsEnabled(workspaceConfiguration.get("phpcs.showWarnings", true));
        phpcbfConfig.setShowSourcesEnabled(workspaceConfiguration.get("phpcs.showSources", true));
        phpcbfConfig.setIgnorePatterns(workspaceConfiguration.get("phpcs.ignorePatterns", []));

        phpcbfConfig.lock();
        return phpcbfConfig;
    }
}
