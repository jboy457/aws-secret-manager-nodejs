const { createServer } = require('http');
const { app } = require('./src/config');
const myapp = require('./src/app');

const server = createServer(myapp);

// const port = app.port;
// const host = app.host;

server.listen(3000, () => {
    console.log(`listening is running on 300`);
});
