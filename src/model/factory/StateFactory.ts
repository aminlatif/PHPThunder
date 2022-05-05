import * as vscode from "vscode";

import State from "@model/State";
import BaseService from "@service/BaseService";
import ConfigService from "@service/ConfigService";
import LogService from "@service/LogService";
import PluginService from "@service/PluginService";

import ConfigFactory from "@model/factory/ConfigFactory";

export default class StateFactory {
    public static createState(extensionContext: vscode.ExtensionContext): State {
        console.log("Loading PHPThunder state...");

        const state = new State(extensionContext);

        console.log("Loading log service...");
        state.setLogService(new LogService());
        state.getLogService().log("Log service loaded.", null, 0);

        state.getLogService().log("Loading active text editor...", null, 0);
        if (vscode.window.activeTextEditor) {
            state.getLogService().log("Active text editor: ", vscode.window.activeTextEditor);
            state.setActiveTextEditorDocumentUri(vscode.window.activeTextEditor.document.uri);
            state.getLogService().log("Active text editor loaded.", null, 0);
        } else {
            state.getLogService().log("No active text editor.", null, 0);
        }

        state.getLogService().log("Loading configuration...", null, 0);
        state.setWorkspaceConfiguration(vscode.workspace.getConfiguration("phpthunder", state.getActiveTextEditorDocumentUri()));
        state.getLogService().log("Document Workspace Folder: " +(ConfigFactory.getDocumentWorkspaceFolder() as string));
        state.setConfigService(new ConfigService(ConfigFactory.createConfig(state.getWorkspaceConfiguration())));
        state.setDebug(state.getConfigService().getConfig().getDebug());
        state.getLogService().setDebug(state.getDebug());
        state.getLogService().log("Debug mode: " + state.getDebug(), null, 0);
        state.getLogService().log("Config: ", state.getConfigService().getConfig());
        state.getLogService().log("Configuration loaded.", null, 0);

        state.getLogService().log("Loading base service...", null, 0);
        state.setBaseService(new BaseService(state));
        state.getLogService().log("Base service loaded.", null, 0);

        state.getLogService().log("Loading plugin service...", null, 0);
        state.setPluginService(new PluginService(state));
        state.getLogService().log("Plugin service loaded.", null, 0);

        state.getLogService().log("PHPThunder state loaded.", null , 0);
        return state;
    }
}
