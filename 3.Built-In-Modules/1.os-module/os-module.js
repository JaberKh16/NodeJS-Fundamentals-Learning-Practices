const os = require('os');
console.log(os);

// access some properties/methods
const osInfo = {
    osName: os.type(),
    osKernelRelease: os.release(),
    osMachine: os.machine(),
    osTotalMemory: os.totalmem(),
    osFreeMemory:os.freemem(),
    osHostName: os.hostname(),
    osVersion: os.version(),
    osUptime: os.uptime(),
    osPlatform: os.platform(),
    osNetworkInterfaces: os.networkInterfaces()
}

console.log(osInfo);