import * as vscode from "vscode";
import * as childProcess from "child_process";
import * as os from "os";

import { IPlugin } from "./IPlugin";

import State from "@model/State";
import ConfigService from "@service/ConfigService";
import LogService from "@service/LogService";

import Config from "@model/Config";

import { LogLevel } from "@enum/logLevel";

export default abstract class Plugin implements IPlugin {
    private state: State;
    private extensionContext: vscode.ExtensionContext;
    public pluginName: string = "Plugin";

    constructor(extensionContext: vscode.ExtensionContext, state: State) {
        this.state = state;
        this.extensionContext = extensionContext;
    }

    public registerSubscriptions(): void {
        if (this.isEnabled()) {
            this.log("Registring plugin: " + this.getPluginName() + "...", null, 0);
            this.registerSubscriptionsTool();
            this.log("Plugin " + this.getPluginName() + " registered.", null, 0);
        } else {
            this.log("Plugin " + this.getPluginName() + " is disabled.", null, 0);
        }
    }

    public abstract registerSubscriptionsTool(): void;

    public init(): void {
        if (this.isEnabled()) {
            this.log("Initiating plugin: " + this.getPluginName() + "...", null, 0);
            this.initTool();
            this.registerSubscriptions();
            this.log("Plugin " + this.getPluginName() + " initiated.", null, 0);
        } else {
            this.log("Plugin " + this.getPluginName() + " is disabled.", null, 0);
        }
    }

    public abstract initTool(): void;

    public getExceuteBaseCommand(): string {
        return this.getPHPExecutablePath() + " " + this.getToolExecutablePath() + " ";
    }

    public getPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        if (this.getConfig().isEnable() && phpExecutablePath) {
            return phpExecutablePath;
        }
        throw new Error("PHPThunder is not enabled.");
    }

    public getToolExecutablePath(): string {
        return "";
    }

    public async setConfig(name: string, value: string): Promise<void> {}

    public async execute(command: string): Promise<boolean> {
        this.log("Command: " + command);
        return new Promise((resolve, reject) => {
            childProcess.exec(command, (err, stdout, stderr) => {
                if (err && err.code !== 1) {
                    vscode.window.showErrorMessage(err.toString() + "\n" + stderr.toString());
                    this.log("", err, 2);
                    this.log("", stderr, 2);
                    this.log("OUT: ", stdout, 0);
                    reject(false);
                    return;
                }
                this.log("", stdout, 0);
                resolve(true);
            });
        });
    }

    public getCurrentlyOpenTabDocumentPath(): string {
        if (vscode.window.activeTextEditor) {
            return vscode.window.activeTextEditor.document.fileName;
        } else {
            throw new Error("No active tab document.");
        }
    }

    public getStandard(): string {
        return this.getConfig().getFormatConfig().getStandard();
    }

    public getErrorSeverity(): number {
        return this.getConfig().getFormatConfig().getErrorSeverity();
    }

    public getWarningSeverity(): number {
        return this.getConfig().getFormatConfig().getWarningSeverity();
    }

    public getShowWarnings(): boolean {
        return this.getConfig().getFormatConfig().getShowWarnings();
    }

    public getShowSources(): boolean {
        return this.getConfig().getFormatConfig().getShowSources();
    }

    public isEnabled(): boolean {
        return this.getConfig().getFormatConfig().getEnable();
    }

    public provideDocumentFormatting(): boolean {
        return this.getConfig().getFormatConfig().getDocumentFormattingProvider();
    }

    public getTempDirectory(): string {
        return os.tmpdir();
    }

    public isDebugEnabled(): boolean {
        return this.getConfig().getDebug();
    }

    public log(message: string, logObject: Object | null = null, severity: LogLevel | number = LogLevel.debug): void {
        this.getLogService().log(this.getPluginName() + ": " + message, logObject, severity);
    }

    public getConfig(): Config {
        return this.getConfigService().getConfig();
    }

    public getConfigService(): ConfigService {
        return this.state.getConfigService();
    }

    public getLogService(): LogService {
        return this.state.getLogService();
    }

    public getState(): State {
        return this.state;
    }

    public getExtensionContext(): vscode.ExtensionContext {
        return this.extensionContext;
    }

    public setPluginName(pluginName: string): void {
        this.pluginName = pluginName;
    }

    public getPluginName(): string {
        return this.pluginName;
    }
}
