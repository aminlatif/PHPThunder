import PluginConfig from "@model/Config/PluginConfig";

export default class PHPCSFixerConfig extends PluginConfig {
    private configFilePath: string | null = null;
    private allowRiskyEnabled: boolean = false;

    public setConfigFilePath(configFilePath: string | null): PHPCSFixerConfig {
        return this.setData("configFilePath", configFilePath) as PHPCSFixerConfig;
    }

    public getConfigFilePath(): string | null {
        return this.configFilePath;
    }

    public setAllowRiskyEnabled(allowRiskyEnabled: boolean): PHPCSFixerConfig {
        return this.setData("allowRiskyEnabled", allowRiskyEnabled) as PHPCSFixerConfig;
    }

    public isAllowRiskyEnabled(): boolean {
        return this.allowRiskyEnabled;
    }
}
