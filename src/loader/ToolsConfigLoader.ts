import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import ToolsConfig from "@model/Config/ToolsConfig";

export default class ToolsConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): ToolsConfig {
        const toolsConfig = new ToolsConfig();

        toolsConfig.setName("Tools Config");
        toolsConfig.setPHPExecutablePath(this.getAbsolutePath(workspaceConfiguration.get<string|null>("tools.phpExecutablePath", null)));

        toolsConfig.lock();
        return toolsConfig;
    }
}
