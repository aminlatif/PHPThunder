import * as vscode from "vscode";
import * as childProcess from "child_process";
import * as os from "os";

import { PluginInterface } from "./PluginInterface";

import State from "@model/State";
import ConfigService from "@service/ConfigService";
import LogService from "@service/LogService";

import Config from "@model/Config";

import { LogLevel } from "@enum/logLevel";

export default abstract class PluginAbstract implements PluginInterface {
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
        return this.getPluginPHPExecutablePath() + " " + this.getToolExecutablePath() + " ";
    }

    public getPluginPHPExecutablePath(): string {
        return this.getPHPExecutablePath();
    }

    public getToolsPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getToolsConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }

        return this.getPHPExecutablePath();
    }

    public getPHPExecutablePath(): string {
        if (this.getConfig().isEnabled()) {
            const phpExecutablePath = this.getConfig().getPHPExecutablePath();
            if (phpExecutablePath) {
                return phpExecutablePath;
            }
        }
        throw new Error("PHPThunder is not enabled.");
    }

    public abstract getToolExecutablePath(): string;

    public async setConfig(name: string, value: string): Promise<void> {}

    public async execute(command: string, popup: boolean = false): Promise<boolean> {
        this.log("Ready to Execute Command.", null, 0);
        return this.state.getCommandService().execute(command, popup);
    }

    public getCurrentlyOpenTabDocumentPath(): string {
        if (vscode.window.activeTextEditor) {
            return vscode.window.activeTextEditor.document.fileName;
        } else {
            throw new Error("No active tab document.");
        }
    }

    public checkIfEnabled(): void {
        if (!this.isEnabled()) {
            throw new Error(this.pluginName + " is disabled.");
        }
    }

    public isEnabled(): boolean {
        return this.getConfig().isEnabled();
    }

    public isDocumentFormattingProviderEnabled(): boolean {
        return this.getConfig().getFormatConfig().isDocumentFormattingProviderEnabled();
    }

    public getTempDirectory(): string {
        return os.tmpdir();
    }

    public isDebugEnabled(): boolean {
        return this.getConfig().isDebugEnabled();
    }

    public log(
        message: string,
        logObject: Object | null = null,
        severity: LogLevel | number = LogLevel.debug,
        popup: boolean = false
    ): void {
        this.getLogService().log(this.getPluginName() + ": " + message, logObject, severity, popup);
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
