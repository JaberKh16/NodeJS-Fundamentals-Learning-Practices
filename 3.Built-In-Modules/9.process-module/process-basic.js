/*
    Process In Nodejs
    =================
    process is a global object in Node.js providing info and control over the current process.
    It's available everywhere — no require() needed.

    Properties in process
    ----------------------
    process.env — all environment variables (object)
    process.argv — command line arguments array
    process.pid — current process ID (number)
    process.ppid — parent process ID
    process.version — Node.js version string
    process.platform — OS: 'linux', 'win32', 'darwin'
    process.arch — CPU: 'x64', 'arm64'
    process.cwd() — current working directory
    process.memoryUsage() — memory stats
    process.cpuUsage() — CPU stats
    process.uptime() — seconds since process started

    Methods in process
    ------------------
    process.exit(code) — terminate (0=success, 1=error)
    process.nextTick(fn) — defer execution
    process.on(event, fn) — listen to events
    process.kill(pid, signal) — send signal to process

*/

const http = require("http");

const server = http.createServer((req, res) => {
    res.status(200).end(JSON.stringify({
        msg: 'Welcome to nodejs server!',
        pid: process.pid
    }))
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT} and the version is
    ${process.version}, platform: ${process.platform}`);
});