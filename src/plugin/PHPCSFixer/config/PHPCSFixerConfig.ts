import PluginConfig from "@model/Config/PluginConfig";

export default class PHPCSFixerConfig extends PluginConfig {
    private allowRiskyEnabled: boolean = false;

    public setAllowRiskyEnabled(allowRiskyEnabled: boolean): PHPCSFixerConfig {
        return this.setData("allowRiskyEnabled", allowRiskyEnabled) as PHPCSFixerConfig;
    }

    public isAllowRiskyEnabled(): boolean {
        return this.allowRiskyEnabled;
    }
}
