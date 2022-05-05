export default class PluginConfig {
    private enable: boolean;
    private executablePath: string | null;

    constructor(enable: boolean, executablePath: string | null) {
        this.enable = enable;
        this.executablePath = executablePath;
    }

    public getEnable(): boolean {
        return this.executablePath !== null && this.enable;
    }

    public getExecutablePath(): string | null {
        return this.executablePath;
    }
}
