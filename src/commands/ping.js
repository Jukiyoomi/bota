const {SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async execute(interaction) {
		await interaction.reply('Pong haha!');
	},
}
