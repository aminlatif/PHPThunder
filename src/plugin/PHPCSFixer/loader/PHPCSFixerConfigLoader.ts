import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import PluginConfigLoader from "@loader/PluginConfigLoader";
import PHPCSFixerConfig from "../config/PHPCSFixerConfig";

export default class PHPCSFixerConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): PHPCSFixerConfig {
        const phpcsfixerConfig = PluginConfigLoader.load<PHPCSFixerConfig>(workspaceConfiguration, "phpcsfixer", new PHPCSFixerConfig());

        phpcsfixerConfig.setName("PHPCS Plugin Config");
        phpcsfixerConfig.setAllowRiskyEnabled(workspaceConfiguration.get("phpcsfixer.allowRisky", false));

        phpcsfixerConfig.lock();
        return phpcsfixerConfig;
    }
}
