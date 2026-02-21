import fs from "node:fs";
import yaml from "js-yaml";

export interface AppConfig {
	clientId: string;
	guildId: string;
	commands: CommandConfig[];
}

export interface CommandConfig {
	name: string;
	description: string;
	subcommands?: SubCommandConfig[];
}

export interface SubCommandConfig {
	name: string;
	description: string;
}

/**
 * コンフィグのロード
 * @param filePath
 */
export function loadConfig(filePath: string): AppConfig {
	try {
		const fileContents = fs.readFileSync(filePath, "utf8");
		const config = yaml.load(fileContents) as AppConfig;

		// commandsがarrayになっていない
		if (!config || !Array.isArray(config.commands)) {
			throw new Error('Invalid YAML structure: "commands" array is required.');
		}
		return config;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to parse YAML: ${error.message}`);
		}
		throw error;
	}
}

/**
 * コンフィグのパス取得
 * コマンドライン引数で指定されていない場合、 `./config.yaml` を使用する
 */
export function getConfigPath(): string {
	const args = process.argv.slice(2);
	const configIndex = args.findIndex((a) => a === "-c" || a === "--config");
	return (
		(configIndex !== -1 ? args[configIndex + 1] : undefined) ?? "config.yaml"
	);
}
