import FormatConfig from "@model/Config/FormatConfig";

export default class Config {
    private enable: boolean;
    private phpExecutablePath: string|null;
    private composerExecutablePath: string|null;
    private composerJsonPath: string|null;
    private debug: boolean;
    private formatConfig: FormatConfig;

    constructor(enable: boolean, phpExecutablePath: string|null, composerExecutablePath: string|null,  debug: boolean, composerJsonPath: string|null, formatConfig: FormatConfig) {
        this.enable = enable;
        this.phpExecutablePath = phpExecutablePath;
        this.composerExecutablePath = composerExecutablePath;
        this.debug = debug;
        this.composerJsonPath = composerJsonPath;
        this.formatConfig = formatConfig;
    }

    public isEnable(): boolean {
        return this.enable;
    }

    public getPhpExecutablePath(): string|null {
        return this.phpExecutablePath;
    }

    public getComposerExecutablePath(): string|null {
        return this.composerExecutablePath;
    }

    public getComposerJsonPath(): string|null {
        return this.composerJsonPath;
    }

    public getDebug(): boolean {
        return this.debug;
    }

    public getFormatConfig(): FormatConfig {
        return this.formatConfig;
    }
}
