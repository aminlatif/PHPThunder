import ConfigAbstract from "@interface/ConfigAbstract";

import FormatConfig from "@model/Config/FormatConfig";
import ToolsConfig from "@model/Config/ToolsConfig";

import ComposerConfig from "@plugin/Composer/config/ComposerConfig";
import PHPCSConfig from "@plugin/PHPCS/config/PHPCSConfig";
import PHPCBFConfig from "@plugin/PHPCBF/config/PHPCBFConfig";
import PHPCSFixerConfig from "@plugin/PHPCSFixer/config/PHPCSFixerConfig";
import PHPFMTConfig from "@plugin/PHPFMT/config/PHPFMTConfig";

export default class Config extends ConfigAbstract {
    private phpExecutablePath: string | null = null;
    private debugEnabled: boolean = false;

    private formatConfig: FormatConfig = new FormatConfig();
    private toolsConfig: ToolsConfig = new ToolsConfig();
    private composerConfig: ComposerConfig = new ComposerConfig();
    private phpCSConfig: PHPCSConfig = new PHPCSConfig();
    private phpCBFConfig: PHPCBFConfig = new PHPCBFConfig();
    private phpCSFixerConfig: PHPCSFixerConfig = new PHPCSFixerConfig();
    private phpFMTConfig: PHPFMTConfig = new PHPFMTConfig();

    public setPHPExecutablePath(phpExecutablePath: string | null): Config {
        return this.setData("phpExecutablePath", phpExecutablePath) as Config;
    }

    public getPHPExecutablePath(): string | null {
        return this.phpExecutablePath;
    }

    public setDebugEnabled(debugEnabled: boolean): Config {
        return this.setData("debugEnabled", debugEnabled) as Config;
    }

    public isDebugEnabled(): boolean {
        return this.debugEnabled;
    }

    public setFormatConfig(formatConfig: FormatConfig): Config {
        return this.setData("formatConfig", formatConfig) as Config;
    }

    public getFormatConfig(): FormatConfig {
        return this.formatConfig;
    }

    public setToolsConfig(toolsConfig: ToolsConfig): Config {
        return this.setData("toolsConfig", toolsConfig) as Config;
    }

    public getToolsConfig(): ToolsConfig {
        return this.toolsConfig;
    }

    public setComposerConfig(composerConfig: ComposerConfig): Config {
        return this.setData("composerConfig", composerConfig) as Config;
    }

    public getComposerConfig(): ComposerConfig {
        return this.composerConfig;
    }

    public setPHPCSConfig(phpCSConfig: PHPCSConfig): Config {
        return this.setData("phpCSConfig", phpCSConfig) as Config;
    }

    public getPHPCSConfig(): PHPCSConfig {
        return this.phpCSConfig;
    }

    public setPHPCBFConfig(phpCBFConfig: PHPCBFConfig): Config {
        return this.setData("phpCBFConfig", phpCBFConfig) as Config;
    }

    public getPHPCBFConfig(): PHPCBFConfig {
        return this.phpCBFConfig;
    }

    public setPHPCSFixerConfig(phpCSFixerConfig: PHPCSFixerConfig): Config {
        return this.setData("phpCSFixerConfig", phpCSFixerConfig) as Config;
    }

    public getPHPCSFixerConfig(): PHPCSFixerConfig {
        return this.phpCSFixerConfig;
    }

    public setPHPFMTConfig(phpFMTConfig: PHPFMTConfig): Config {
        return this.setData("phpFMTConfig", phpFMTConfig) as Config;
    }

    public getPHPFMTConfig(): PHPFMTConfig {
        return this.phpFMTConfig;
    }
}
