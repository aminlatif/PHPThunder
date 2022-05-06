import ConfigAbstract from "@interface/ConfigAbstract";

export default class PluginConfig extends ConfigAbstract {
    private phpExecutablePath: string | null = null;
    private executablePath: string | null = null;

    public setPHPExecutablePath(phpExecutablePath: string|null): PluginConfig {
        return this.setData("phpExecutablePath", phpExecutablePath) as PluginConfig;
    }

    public getPHPExecutablePath(): string | null {
        return this.phpExecutablePath;
    }

    public setExecutablePath(executablePath: string|null): PluginConfig {
        return this.setData("executablePath", executablePath) as PluginConfig;
    }

    public getExecutablePath(): string | null {
        return this.executablePath;
    }
}
