/*
    Node.js JavaScript execution is single-threaded — only one JS operation runs at a time.
    BUT the underlying libuv is multi-threaded for heavy I/O operations.
    
    What's single-threaded:
    1. Your JavaScript code
    2. V8 engine execution
    3. The event loop itself

    What's multi-threaded (libuv thread pool):
    1. File system operations (fs module)
    2. DNS lookups (dns.lookup)
    3. Crypto operations (bcrypt, large hashes)
    4. User-defined C++ add-ons

    What's OS-level async (not thread pool):
    1. Network I/O (TCP, UDP, HTTP requests)
    2. Unix domain sockets
    3. Pipes

    Thread pool size:
    1. Default: 4 threads
    4. Configure: UV_THREADPOOL_SIZE=16 node app.js


    Note: The CPU-blocking issue is the Achilles heel of Node.js. Any synchronous loop longer than ~50ms will cause visible latency 
    spikes. Always offload heavy computation to Worker Threads, child processes, or a separate service.
    
*/
const http = require('http');
const PORT = 3000;

// setup the server
// http.createServer((req, res) => {
//     if(req.url === '/slow'){
//         // CPU-intensive - Blocks the event loop
//         // while this run, no other request can be handled
//         let result = 0;
//         for (let index = 0; index < 5e9; result+= index) {
//             res.end(`Result: ${result}`) // takes ~3 seconds — all others wait!
//         }
//     } else {
//         res.end('Fast response');
//     }
// }).listen(PORT);

// fix: offload CPU work to worker thread
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
if(isMainThread){
    http.createServer((req, res) => {
        if(req.url === '/slow'){
            new Worker(__filename, { workerData: { n: 5e9 } }).on('message', result => {
                res.end(`Result: ${result}`)
            })
        } else {
            res.end(`Fast response`);
        }
    }).listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`)
    })
} else{
    let result = 0;
    for (let index = 0; index < workerData.n; index++) {
        result += index;
        parentPort.postMessage(result);
    }
}