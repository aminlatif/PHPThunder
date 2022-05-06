import * as vscode from "vscode";
import * as childProcess from "child_process";

import State from "@model/State";

export default class CommandService {
    private state: State;

    constructor(state: State) {
        this.state = state;
    }

    public async execute(command: string, popup: boolean = false): Promise<boolean> {
        this.state.getLogService().log("Executing command: " + command, null, 0);
        return new Promise((resolve, reject) => {
            childProcess.exec(command, (err, stdout, stderr) => {
                const errMessage = err ? err.toString() : null;
                const stdoutMessage = stdout ? stdout.toString() : null;
                const stderrMessage = stderr ? stderr.toString() : null;

                if(errMessage && errMessage.length > 0) {
                    this.state.getLogService().log("err: " + errMessage, null, 2, true);
                }

                if(stderrMessage && stderrMessage.length > 0) {
                    this.state.getLogService().log("stderr: " + stderrMessage, null, 2, true);
                }

                if(stdoutMessage && stdoutMessage.length > 0) {
                    this.state.getLogService().log("stdout: " + stdoutMessage, null, 0, popup);
                }

                resolve(true);
            });
        });
    }
}
