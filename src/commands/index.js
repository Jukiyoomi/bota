require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const {REST, Routes} = require('discord.js');

async function getCommands() {
	const commands = [];
	const commandFiles = fs.readdirSync(path.join(__dirname))
		.filter(file => !file.includes("index") && !file.includes("run") && file.endsWith('.js'));

	console.log(commandFiles);

	for (const file of commandFiles) {
		const command = require(`./${file}`);
		commands.push(command.data.toJSON());
	}
	return commands;
}

async function deploy(guildId) {
	const commands = await getCommands();

	if (commands.length === 0) {
		console.log("No commands found!");
		process.exit(1);
		return
	}

	const restClient = new REST({version: "9"}).setToken(process.env.DISCORD_TOKEN);

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await restClient.put(
			Routes.applicationGuildCommands(process.env.DISCORD_APP_ID, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
}

module.exports = deploy;
