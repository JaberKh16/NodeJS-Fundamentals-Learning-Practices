const environments = {};

environments.staging = {
    port: 3000,
    host: '127.0.0.1',
    envName: 'staging',
};

environments.production = {
    port: 5000,
    host: '127.0.0.1',
    envName: 'production',
};

// determine which environment
// eslint-disable-next-line operator-linebreak
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
// eslint-disable-next-line operator-linebreak
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
