import * as vscode from "vscode";

import State from "@model/State";

import General from "@plugin/General";
import PHPCS from "@plugin/PHPCS";
import PHPCBF from "@plugin/PHPCBF";
import PHPCSFixer from "@plugin/PHPCSFixer";
import PHPFMT from "@plugin/PHPFMT";

export default class PluginService {
    private state: State;
    private general: General;
    private phpCS: PHPCS;
    private phpCBF: PHPCBF;
    private phpCSFixer: PHPCSFixer;
    private phpFMT: PHPFMT;

    constructor(state: State) {
        this.state = state;
        const extensionContext = state.getExtensionContext();
        this.general = new General(extensionContext, state);
        this.phpCS = new PHPCS(extensionContext, state);
        this.phpCBF = new PHPCBF(extensionContext, state);
        this.phpCSFixer = new PHPCSFixer(extensionContext, state);
        this.phpFMT = new PHPFMT(extensionContext, state);
    }

    public initPlugins(): void {
        this.general.init();
        this.phpCS.init();
        this.phpCBF.init();
        this.phpCSFixer.init();
        this.phpFMT.init();
    }
}
