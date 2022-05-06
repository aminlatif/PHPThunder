import PluginConfig from "@model/Config/PluginConfig";

export default class ComposerConfig extends PluginConfig {
    private composerJsonPath: string | null = null;

    public setComposerJsonPath(composerJsonPath: string|null): ComposerConfig {
        return this.setData("composerJsonPath", composerJsonPath) as ComposerConfig;
    }

    public getComposerJsonPath(): string | null {
        return this.composerJsonPath;
    }
}
