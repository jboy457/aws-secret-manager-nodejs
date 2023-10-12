const express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    fs = require('fs');

require('dotenv-json')({ path: './.env.json' });

const { retrieveSecrets } = require('../src/config');

class MyApp {
    constructor() {
        this.app = express();
        this.init();
    }

    async init() {
        try {
            //get secretsString:
            const secretsString = await retrieveSecrets();
            console.log(secretsString);

            //write to .env file at root level of project:
            fs.appendFileSync('.env', secretsString);

            console.log('Server running on port 4000');
        } catch (error) {
            //log the error and crash the app
            console.log('Error in setting environment variables', error);
            process.exit(-1);
        }
        this.initMiddleware();
        // this.initDB();
    }

    initMiddleware() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    async initDB() {
        sequelize.sync().then(async () => {
            logger.info('Database connected!!');
        });
        redisClient.connect();
    }
}

module.exports = new MyApp().app;
