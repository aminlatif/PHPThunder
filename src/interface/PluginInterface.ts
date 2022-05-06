import State from "@model/State";
import ConfigService from "@service/ConfigService";
import LogService from "@service/LogService";

import Config from "@model/Config";

import { LogLevel } from "@enum/logLevel";

export interface PluginInterface {
    registerSubscriptions(): void;
    registerSubscriptionsTool(): void;
    init(): void;
    initTool(): void;
    getExceuteBaseCommand(): string;
    getPHPExecutablePath(): string;
    getToolExecutablePath(): string;
    setConfig(name: string, value: string): Promise<void>;
    execute(command: string): Promise<boolean>;
    getCurrentlyOpenTabDocumentPath(): string;
    isEnabled(): boolean;
    isDocumentFormattingProviderEnabled(): boolean;
    getTempDirectory(): string;
    isDebugEnabled(): boolean;
    log(message: string, logObject: Object | null, severity: LogLevel | number): void;
    getState(): State;
    getConfig(): Config;
    getConfigService(): ConfigService;
    getLogService(): LogService;

}
