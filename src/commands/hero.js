const {SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hero')
		.setDescription('Get a a hero photo')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription("Pick your hero among first 'Avengers' film characters")
				.setRequired(true)
				.addChoices(
					{
						name: 'Iron Man',
						value: 'ironman-endgameprofile',
					},
					{
						name: 'Thor',
						value: 'thor-endgameprofile',
					},
					{
						name: "Captain America",
						value: "capamerica-endgameprofile"
					},
					{
						name: "Hawkeye",
						value: "hawkeye-hawk-imgprofil"
					},
					{
						name: "Black Widow",
						value: "bwendgame"
					},
					{
						name: "Hulk",
						value: "hulk-shehulk-imgprofil"
					}
				)
		),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async execute(interaction) {
		const heroName = interaction.options.get('name')?.value;
		const url = `http://www.marvel-cineverse.fr/medias/images/${heroName}.jpg`;
		await interaction.reply({content: url});
	},
}
