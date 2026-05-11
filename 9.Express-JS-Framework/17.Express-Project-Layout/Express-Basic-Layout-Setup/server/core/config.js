// config.js
import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export function loadConfig() {
    const data = fs.readFileSync('server.config.json', { encoding: 'utf-8' });
    console.log(data);
    return JSON.parse(data);
}
