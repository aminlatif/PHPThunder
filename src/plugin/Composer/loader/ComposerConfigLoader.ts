import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import PluginConfigLoader from "@loader/PluginConfigLoader";
import ComposerConfig from "../config/ComposerConfig";

export default class ComposerConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): ComposerConfig {
        const composerConfig = PluginConfigLoader.load<ComposerConfig>(workspaceConfiguration, "composer", new ComposerConfig());

        composerConfig.setName("Composer Plugin Config");
        composerConfig.setComposerJsonPath(
            this.getAbsolutePath(workspaceConfiguration.get<string | null>("composer.composerJsonPath", null))
        );

        composerConfig.lock();
        return composerConfig;
    }
}
