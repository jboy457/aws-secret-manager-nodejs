const AWS = require('aws-sdk');
const env = require('../../.env.json');
process.env = { ...process.env, ...env }
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key ID
    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY, // Secret access key
    region: process.env.AWS_REGION, // Region
});

module.exports.retrieveSecrets = () => {
    //configure AWS SDK
    const region = process.env.AWS_REGION;
    const client = new AWS.SecretsManager({ region });
    console.log(process.env.AWS_ACCESS_ID);




    const SecretId = 'test-secret';
    return new Promise((resolve, reject) => {
        //retrieving secrets from secrets manager
        client.getSecretValue({ SecretId }, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                //parsing the fetched data into JSON
                const secretsJSON = JSON.parse(data.SecretString);
                // creating a string to store write to .env file
                // .env file shall look like this :
                // SECRET_1 = sample_secret_1
                // SECRET_2 = sample_secret_2
                let secretsString = '';
                Object.keys(secretsJSON).forEach(key => {
                    secretsString += `${key}=${secretsJSON[key]}\n`;
                });
                resolve(secretsString);
            }
        });
    });
};
