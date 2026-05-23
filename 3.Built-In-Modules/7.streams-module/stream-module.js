const fs = require("fs");
const zlib = require("zlib");
const { Transform, pipeline } = require("stream");
const { promisify } = require("util");
const http = require("http");

const pipelineAsync = promisify(pipeline);

// basic : pipe readable to writable
fs.createReadStream("input.txt").pipe(fs.createWriteStream("output.txt"));

// chain transform: read -> gzip compress -> write
await pipelineAsync(
  fs.createReadStream("huge-file.log"), // reads in 64KB chunks
  fs.createGzip(), // compress each chunk
  fs.createWriteStream("archive.log.gz"), // write compressed
);

// custome transform stream
const csvToJSON = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const line = chunk.toString().trim();
    if (!line) {
      return callback();
    }
    const [name, email, age] = line.split(",");
    this.push(
      JSON.stringify({
        name,
        email,
        age: parseInt(age),
      }) + "\n",
    );
    callback();
  },
});

// stream a large file as HTTP response
http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");
    fs.createReadStream("./exports/large-data.csv")
      .on("error", (err) => res.destroy(err))
      .pipe(res);
  })
  .listen(3000);

// read stream events manually
const readStream = fs.createReadStream("data.txt", {
  highWaterMark: 64 * 1024,
});
let totalBytes = 0;
readStream.on("data", (chunk) => {
  totalBytes += chunk.length;
});
readStream.on("end", () => console.log(`Total: ${totalBytes} bytes`));
readStream.on("error", (err) => console.error("Stream error: ", err));
