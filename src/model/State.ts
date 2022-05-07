import * as vscode from "vscode";

import BaseService from "@service/BaseService";
import CommandService from "@service/CommandService";
import ConfigService from "@service/ConfigService";
import LogService from "@service/LogService";
import PluginService from "@service/PluginService";

export default class State {
    private extensionContext: vscode.ExtensionContext;

    private workspaceConfiguration: vscode.WorkspaceConfiguration | null = null;

    private baseService: BaseService | null = null;
    private commandService: CommandService | null = null;
    private configService: ConfigService | null = null;
    private logService: LogService | null = null;
    private pluginService: PluginService | null = null;

    private activeTextEditorDocumentUri: vscode.Uri | null = null;

    private debug: boolean = false;

    constructor(extensionContext: vscode.ExtensionContext) {
        this.extensionContext = extensionContext;
    }

    public getExtensionContext(): vscode.ExtensionContext {
        return this.extensionContext;
    }

    public setWorkspaceConfiguration(workspaceConfiguration: vscode.WorkspaceConfiguration): void {
        this.workspaceConfiguration = workspaceConfiguration;
    }

    public getWorkspaceConfiguration(): vscode.WorkspaceConfiguration {
        if (this.workspaceConfiguration) {
            return this.workspaceConfiguration;
        }
        throw new Error("Workspace configuration is not set");
    }

    public setBaseService(baseService: BaseService): void {
        this.baseService = baseService;
    }

    public getBaseService(): BaseService {
        if (this.baseService) {
            return this.baseService;
        }
        throw new Error("Base service is not set");
    }

    public setCommandService(commandService: CommandService): void {
        this.commandService = commandService;
    }

    public getCommandService(): CommandService {
        if (this.commandService) {
            return this.commandService;
        }
        throw new Error("Command service is not set");
    }

    public setConfigService(configService: ConfigService): void {
        this.configService = configService;
    }

    public getConfigService(): ConfigService {
        if (this.configService) {
            return this.configService;
        }
        throw new Error("Config service is not set");
    }

    public setLogService(logService: LogService): void {
        this.logService = logService;
    }

    public getLogService(): LogService {
        if (this.logService) {
            return this.logService;
        }
        throw new Error("Log service is not set");
    }

    public isLogServiceDefined(): boolean {
        if (this.logService) {
            return true;
        }
        return false;
    }

    public setPluginService(pluginService: PluginService): void {
        this.pluginService = pluginService;
    }

    public getPluginService(): PluginService {
        if (this.pluginService) {
            return this.pluginService;
        }
        throw new Error("Plugin service is not set");
    }

    public setActiveTextEditorDocumentUri(activeTextEditorDocumentUri: vscode.Uri | null): void {
        this.activeTextEditorDocumentUri = activeTextEditorDocumentUri;
    }

    public getActiveTextEditorDocumentUri(): vscode.Uri | null {
        return this.activeTextEditorDocumentUri;
    }

    public setDebug(debug: boolean): void {
        this.debug = debug;
    }

    public getDebug(): boolean {
        return this.debug;
    }
}
