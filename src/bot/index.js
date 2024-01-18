const { Client, Partials } = require("discord.js");
const intents = require("./intents");
const deploy = require('../commands');

class Bot {
	#client;

	#commandsRestrictions = {
		"todo": "1187764316963880981",
		"image": "1187785315751039138",
		"hero": "1187785315751039138",
	}

	constructor() {
		this.#client = new Client({
			intents,
			partials: [Partials.Channel, Partials.Message],
		})
	}


	async start() {
		this.#client.on("ready", async (c) => {
			console.log(`Bot ${c.user.tag} is ready!`)
			// const channel = await this.#client.channels.cache.get("1187758295855939677");
			// const job = new CronJob("*/10 * * * * *", async () => {
			// 	channel.send("Hello World");
			// 	console.log("Message sent");
			// });
			// job.start();
		});

		this.#client.on("guildCreate", async (guild) => {
			const mainChannelNameExamples = ["general", "général", "main", "accueil", "welcome"];
			console.log(`Joined guild ${guild.name} (${guild.id})`);
			await deploy(guild.id);
			const channel = await guild.channels.cache.find(c => c.type === 0 && mainChannelNameExamples.includes(c.name.toLowerCase()));
			if (!channel) return;
			channel
				.send(
					`Hello ${guild.name}. I am ***F.R.I.D.A.Y.*** (for Female Replacement Intelligent Digital Assistant Youth)` +
					" created by Wil Frite. I automatically registered my commands. Have fun with them."
				);
		});

		this.onInteractionCreate();
		await this.#client.login(process.env.DISCORD_TOKEN);
	}

	onInteractionCreate() {
		this.#client.on("interactionCreate", async (interaction) => {
			if (!interaction.isChatInputCommand()) return;
			const command = interaction.commandName;
			if (!interaction.channel) return;
			// const commandChannel = this.#commandsRestrictions[command];
			// console.log(interaction.channel.id, commandChannel, command)
			// if (commandChannel && commandChannel !== interaction.channel.id) {
			// 	await interaction.reply({
			// 		content: `You can only use this command in <#${commandChannel}>, caca`,
			// 		ephemeral: true
			// 	});
			// 	return;
			// }

			const commandFile = require(`../commands/${command}.js`);
			await commandFile.execute(interaction);
		});
	}
}

module.exports = Bot;
