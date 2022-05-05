import * as vscode from "vscode";
import * as childProcess from "child_process";

import State from "@model/State";

export default class BaseService {
    private state: State;

    constructor(state: State) {
        this.state = state;
    }
}
