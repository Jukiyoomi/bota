require("dotenv").config();
const Bot = require("./bot");
const http = require("node:http");

const client = new Bot();

http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.write("Hello World!");
	res.end();
}).listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});

async function bootstrap() {
	await client.start();
}

bootstrap()
	.then(() => console.log("Everything is ready!"))
	.catch((err) => console.error(err));


