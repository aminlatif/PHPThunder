import * as vscode from "vscode";

import State from "@model/State";
import BaseService from "@service/BaseService";
import CommandService from "@service/CommandService";
import ConfigService from "@service/ConfigService";
import LogService from "@service/LogService";
import PluginService from "@service/PluginService";

import ConfigLoader from "@loader/ConfigLoader";
import { stat } from "fs";

export default class StateLoader {
    public static load(extensionContext: vscode.ExtensionContext, origianlState: State | null = null): State {
        console.log("Loading PHPThunder state...");

        const state = origianlState || new State(extensionContext);

        console.log("Loading log service...");
        if (!state.isLogServiceDefined()) {
            state.setLogService(new LogService());
            state.getLogService().createOuputChannel();
        }
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
        state.setWorkspaceConfiguration(
            vscode.workspace.getConfiguration("phpthunder", state.getActiveTextEditorDocumentUri())
        );
        state
            .getLogService()
            .log("Document Workspace Folder: " + (ConfigLoader.getDocumentWorkspaceFolder() as string));
        state.setConfigService(new ConfigService(ConfigLoader.load(state.getWorkspaceConfiguration())));
        state.setDebug(state.getConfigService().getConfig().isDebugEnabled());
        state.getLogService().setDebug(state.getDebug());
        state.getLogService().log("Debug mode: " + state.getDebug(), null, 0);
        state.getLogService().log("Config: ", state.getConfigService().getConfig());
        state.getLogService().log("Configuration loaded.", null, 0);

        state.getLogService().log("Loading base service...", null, 0);
        state.setBaseService(new BaseService(state));
        state.getLogService().log("Base service loaded.", null, 0);

        state.getLogService().log("Loading command service...", null, 0);
        state.setCommandService(new CommandService(state));
        state.getLogService().log("Command service loaded.", null, 0);

        state.getLogService().log("Loading plugin service...", null, 0);
        state.setPluginService(new PluginService(state));
        state.getLogService().log("Plugin service loaded.", null, 0);

        state.getLogService().log("PHPThunder state loaded.", null, 0);
        return state;
    }
}
