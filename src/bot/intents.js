const {IntentsBitField} = require("discord.js");

const intents = [
	IntentsBitField.Flags.Guilds,
	IntentsBitField.Flags.GuildMembers,
	IntentsBitField.Flags.GuildMessages,
	IntentsBitField.Flags.GuildIntegrations,
	IntentsBitField.Flags.DirectMessages,
	IntentsBitField.Flags.GuildMessageTyping,
	IntentsBitField.Flags.MessageContent,
];

module.exports = intents;
