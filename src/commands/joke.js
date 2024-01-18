const {SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Replies with a joke!'),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async execute(interaction) {
		try {
			const response = await fetch("https://official-joke-api.appspot.com/random_joke");
			const result = await response.json();
			return interaction
				.reply(`${result.setup}\n||${result.punchline} 🥁||`);
		} catch (e) {
			console.log(e);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
}
