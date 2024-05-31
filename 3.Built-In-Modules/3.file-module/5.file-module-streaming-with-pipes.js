/*
    Stream With Piping File Module
    ==============================
    Pipes is a concept of connecting two streams one as readable stream to the writable stream where one is used
    to read as streaming while performing the write to that chunk of read stream.

    It returns the destination stream which enables chaining but the condition is stream should be readable, duplex, transform.
    Example-
        const gzip = require('zlib);
        const readableStream = fs.createReadStream('./file.txt.gz',{
            encoding: 'utf8',
            higherWaterMark:2,
        });
        readableStream.pipe(gzip).pipe(fs.createWriteStream('./file-1.txt'));
    
    Above, 'readableStream.pipe(gzip)' part provides the transform stream which then converted to writable
    stream through pipes chaining.

    
*/

const fs = require('fs');
const path = require('path');
const zlib = require('zlib'); // import zlib for gzip compression

const filePath = path.join(__dirname, 'files', 'text-2.txt');
const readableStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
    highWaterMark: 2,  // to define reading 2 bytes of chunk
});

// create a writable stream
const destinationPath = path.resolve(__dirname, 'files', 'text-3.txt.gz');
const writableStream = fs.createWriteStream(destinationPath);

// pipe the readable stream to the writable stream
readableStream.pipe(zlib.createGzip()).pipe(writableStream);
