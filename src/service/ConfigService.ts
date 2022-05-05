import Config from "@model/Config";

export default class ConfigService {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public getConfig(): Config {
        return this.config;
    }
}
