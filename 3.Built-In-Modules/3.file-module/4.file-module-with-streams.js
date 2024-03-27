/*
    Stream With Fle Module
    ======================
    Stream is a sequence of data that is being moved from one point to another over time. It work with
    data in chunks instead of waiting for the entire data to be available at once which reduce extra memory
    usage and extra time.

    Example:
        a. Local- File transfered from local machine one drive to another.
        b. Remote- Streaming videos on any remote site.

    Stream infact is built-in module in NodeJS that inherits form the event emitter class.

    Types Of Stream
    ---------------
    a. Readable Stream - data can be read
    b. Writable Stream - data can be write
    c. Duplex Stream - both Readable and Writable
    d. Transform Stream - modify or transform data as it is written and read

    Examples:
        a. reading from a file as readable stream
        b. writing to a file as writable stream
        c. socket as duplex stream
        d. file compression where can write compressed data and read
           decompressed data to and from a file as a transform stream.
*/

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'files', 'text-2.txt');
const readableStream = fs.createReadStream(filePath,{
    encoding: 'utf8',
    highWaterMark: 2,  // to define reading 2 bytes of chunk
});
console.log(readableStream);

const writefilePath = path.join(__dirname,'files', 'text-3.txt');
const writableStream = fs.createWriteStream(writefilePath);

readableStream.on('data', (chunk)=>{
    console.log(chunk);
    
    writableStream.on('finish', () => {
        writableStream.write(chunk);
        console.log('Write completed');
    });

    writableStream.on('error', (error) => {
        console.error('Error writing to file:', error);
    });

   
})

