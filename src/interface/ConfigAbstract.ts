export default abstract class ConfigAbstract {
    private enabled: boolean = true;
    private locked: boolean = false;
    private configName: string = "Config";

    constructor() {}

    public lock(): void {
        this.locked = true;
    }

    public isLocked(): boolean {
        return this.locked;
    }

    public setEnabled(enabled: boolean): ConfigAbstract {
        return this.setData("enabled", enabled);
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setName(configName: string): ConfigAbstract {
        return this.setData("configName", configName);
    }

    public getName(): string {
        return this.configName;
    }

    public setData(propertyName: string, value: any): ConfigAbstract {
        if (this.locked) {
            throw new Error("Config " + this.configName + " is locked.");
        }
        (<any>this)[propertyName] = value;
        return this;
    }
}
