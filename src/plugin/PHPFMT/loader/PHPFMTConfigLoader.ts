import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import PluginConfigLoader from "@loader/PluginConfigLoader";
import PHPFMTConfig from "../config/PHPFMTConfig";

export default class PHPFMTConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPFMTConfig {
        const phpfmtConfig = PluginConfigLoader.load<PHPFMTConfig>(workspaceConfiguration, "phpfmt", new PHPFMTConfig());

        phpfmtConfig.setName("PHPCS Plugin Config");
        phpfmtConfig.setConfigFilePath(this.getAbsolutePath(workspaceConfiguration.get<string | null>("phpfmt.configFile", null)));

        phpfmtConfig.lock();
        return phpfmtConfig;
    }
}
