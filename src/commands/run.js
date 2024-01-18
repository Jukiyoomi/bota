const deploy = require('./index');

const arguments = process.argv.splice(2);
const guildId = arguments[0];

deploy(guildId)
	.then(() => console.log("Commands deployed!"));
