import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import PluginConfig from "@model/Config/PluginConfig";

export default class PluginConfigLoader extends ConfigLoaderAbstract {
    public static load<T>(
        workspaceConfiguration: vscode.WorkspaceConfiguration,
        pluginName: string = "plugin",
        pluginConfig: T
    ): T {
        if (pluginConfig instanceof PluginConfig) {
            pluginConfig.setName("Plugin Config");
            pluginConfig.setEnabled(workspaceConfiguration.get(pluginName + ".format.enable", true));
            pluginConfig.setPHPExecutablePath(
                this.getAbsolutePath(workspaceConfiguration.get<string | null>(pluginName + ".phpExecutablePath", null))
            );
            pluginConfig.setExecutablePath(
                this.getAbsolutePath(workspaceConfiguration.get<string | null>(pluginName + ".executablePath", null))
            );
        }

        return pluginConfig;
    }
}
