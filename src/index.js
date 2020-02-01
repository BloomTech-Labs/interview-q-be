require('dotenv').config();

const server = require('./server.js');

const options = { port: process.env.APOLLO_PORT || 4000 };

server.start(options, ({ port }) => {
	console.log(`QualityHub InterviewQ running on ${port}`);
});
