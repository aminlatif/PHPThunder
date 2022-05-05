import PluginConfig from "@model/Config/PluginConfig";

export default class PHPCSFixerConfig extends PluginConfig {
    private allowRisky: boolean;

    constructor(enable: boolean, executablePath: string | null, allowRisky: boolean) {
        super(enable, executablePath);
        this.allowRisky = allowRisky;
    }

    public getAllowRisky(): boolean {
        return this.allowRisky;
    }
}
