import ConfigAbstract from "@interface/ConfigAbstract";

export default class ToolsConfig extends ConfigAbstract {
    private phpExecutablePath: string | null = null;

    public setPHPExecutablePath(phpExecutablePath: string|null): ToolsConfig {
        return this.setData("phpExecutablePath", phpExecutablePath) as ToolsConfig;
    }

    public getPHPExecutablePath(): string | null {
        return this.phpExecutablePath;
    }
}