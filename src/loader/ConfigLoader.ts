import * as vscode from "vscode";

import ConfigLoaderAbstract from "@interface/ConfigLoaderAbstract";
import FormatConfigLoader from "./FormatConfigLoader";
import ToolsConfigLoader from "./ToolsConfigLoader";

import ComposerConfigLoader from "@plugin/Composer/loader/ComposerConfigLoader";
import PHPCSConfigLoader from "@plugin/PHPCS/loader/PHPCSConfigLoader";
import PHPCBFConfigLoader from "@plugin/PHPCBF/loader/PHPCBFConfigLoader";
import PHPCSFixerConfigLoader from "@plugin/PHPCSFixer/loader/PHPCSFixerConfigLoader";
import PHPFMTConfigLoader from "@plugin/PHPFMT/loader/PHPFMTConfigLoader";

import Config from "@model/Config";

export default class ConfigLoader extends ConfigLoaderAbstract {
    public static load(workspaceConfiguration: vscode.WorkspaceConfiguration): Config {
        const config = new Config();
        config.setEnabled(workspaceConfiguration.get("enable", true));
        config.setPHPExecutablePath(this.getAbsolutePath(workspaceConfiguration.get("phpExecutablePath", "/usr/bin/php")));
        config.setDebugEnabled(workspaceConfiguration.get("debug", false));

        config.setFormatConfig(FormatConfigLoader.load(workspaceConfiguration));
        config.setToolsConfig(ToolsConfigLoader.load(workspaceConfiguration));

        config.setComposerConfig(ComposerConfigLoader.load(workspaceConfiguration));
        config.setPHPCSConfig(PHPCSConfigLoader.load(workspaceConfiguration));
        config.setPHPCBFConfig(PHPCBFConfigLoader.load(workspaceConfiguration));
        config.setPHPCSFixerConfig(PHPCSFixerConfigLoader.load(workspaceConfiguration));
        config.setPHPFMTConfig(PHPFMTConfigLoader.load(workspaceConfiguration));

        config.lock();
        return config;
    }
}
