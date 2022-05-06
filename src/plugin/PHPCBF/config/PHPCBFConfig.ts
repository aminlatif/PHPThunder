import PluginConfig from "@model/Config/PluginConfig";

export default class PHPCBFConfig extends PluginConfig {
    private autoConfigSearchEnabled: boolean = false;
    private standard: string | null = null;
    private ignorePatterns: string[] = [];
    private errorSeverityLevel: number = 5;
    private warningSeverityLevel: number = 5;
    private showWarningsEnabled: boolean = true;
    private showSourcesEnabled: boolean = false;

    public setAutoConfigSearchEnabled(autoConfigSearchEnabled: boolean): PHPCBFConfig {
        return this.setData("autoConfigSearchEnabled", autoConfigSearchEnabled) as PHPCBFConfig;
    }

    public isAutoConfigSearchEnabled(): boolean {
        return this.autoConfigSearchEnabled;
    }

    public setStandard(standard: string|null): PHPCBFConfig {
        return this.setData("standard", standard) as PHPCBFConfig;
    }

    public getStandard(): string | null {
        return this.standard;
    }

    public setIgnorePatterns(ignorePatterns: string[]): PHPCBFConfig {
        return this.setData("ignorePatterns", ignorePatterns) as PHPCBFConfig;
    }

    public getIgnorePatterns(): string[] {
        return this.ignorePatterns;
    }

    public setErrorSeverityLevel(errorSeverityLevel: number): PHPCBFConfig {
        return this.setData("errorSeverityLevel", errorSeverityLevel) as PHPCBFConfig;
    }

    public getErrorSeverityLevel(): number {
        return this.errorSeverityLevel;
    }

    public setWarningSeverityLevel(warningSeverityLevel: number): PHPCBFConfig {
        return this.setData("warningSeverityLevel", warningSeverityLevel) as PHPCBFConfig;
    }

    public getWarningSeverityLevel(): number {
        return this.warningSeverityLevel;
    }

    public setShowWarningsEnabled(showWarningsEnabled: boolean): PHPCBFConfig {
        return this.setData("showWarningsEnabled", showWarningsEnabled) as PHPCBFConfig;
    }

    public isShowWarningsEnabled(): boolean {
        return this.showWarningsEnabled;
    }

    public setShowSourcesEnabled(showSourcesEnabled: boolean): PHPCBFConfig {
        return this.setData("showSourcesEnabled", showSourcesEnabled) as PHPCBFConfig;
    }

    public isShowSourcesEnabled(): boolean {
        return this.showSourcesEnabled;
    }
}
