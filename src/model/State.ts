import * as vscode from "vscode";

import BaseService from "@service/BaseService";
import ConfigService from "@service/ConfigService";
import LogService from "@service/LogService";
import PluginService from "@service/PluginService";

export default class State {
    private extensionContext: vscode.ExtensionContext;

    private workspaceConfiguration: vscode.WorkspaceConfiguration;

    private baseService: BaseService;
    private configService: ConfigService;
    private logService: LogService;
    private pluginService: PluginService;

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
        return this.workspaceConfiguration;
    }

    public setBaseService(baseService: BaseService): void {
        this.baseService = baseService;
    }

    public getBaseService(): BaseService {
        return this.baseService;
    }

    public setConfigService(configService: ConfigService): void {
        this.configService = configService;
    }

    public getConfigService(): ConfigService {
        return this.configService;
    }

    public setLogService(logService: LogService): void {
        this.logService = logService;
    }

    public getLogService(): LogService {
        return this.logService;
    }

    public setPluginService(pluginService: PluginService): void {
        this.pluginService = pluginService;
    }

    public getPluginService(): PluginService {
        return this.pluginService;
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
