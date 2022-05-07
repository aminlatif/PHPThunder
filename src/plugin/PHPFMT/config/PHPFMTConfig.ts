import PluginConfig from "@model/Config/PluginConfig";

export default class PHPFMTConfig extends PluginConfig {
    private configFilePath: string | null = null;

    public setConfigFilePath(configFilePath: string | null): PHPFMTConfig {
        return this.setData("configFilePath", configFilePath) as PHPFMTConfig;
    }

    public getConfigFilePath(): string | null {
        return this.configFilePath;
    }
}
