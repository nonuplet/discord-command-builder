import * as util from "node:util";
import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { type CommandConfig, getConfigPath, loadConfig } from "./config.js";

// DISCORD_TOKEN のチェック
const token = process.env.DISCORD_TOKEN;
if (!token) {
	console.error("DISCORD_TOKEN is not set.");
	process.exit(1);
}

// コンフィグのロード
const configPath = getConfigPath();
const config = loadConfig(configPath);
console.log(util.inspect(config, { depth: null, colors: true }));

// SlashCommandBuilder の組み立て
const commands = config.commands.map((cmd: CommandConfig) => {
	const builder = new SlashCommandBuilder()
		.setName(cmd.name)
		.setDescription(cmd.description);

	if (cmd.subcommands) {
		for (const sub of cmd.subcommands) {
			builder.addSubcommand((subcommand) =>
				subcommand.setName(sub.name).setDescription(sub.description),
			);
		}
	}
	return builder.toJSON();
});

const rest: REST = new REST().setToken(token);
try {
	console.log("Registering application commands...");
	await rest.put(
		Routes.applicationGuildCommands(config.clientId, config.guildId),
		{
			body: commands,
		},
	);
	console.log("Successfully registered application commands.");
} catch (error) {
	console.error(error);
}
