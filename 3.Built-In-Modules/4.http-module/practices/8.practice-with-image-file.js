/*
    Practice: Working with Image Files in Node.js
    ----------------------------------------------
    Image can be send in some ways:
        1. As a File
        2. As a Buffer
        3. As a Stream
        4. As a Base64 String
        5. As a URL
        6. As a Data URI
        7. As a Blob (Binary Large Object)

    In this practice, we will work with image files using the 'fs' module in Node.js.
*/

const fs = require('fs');
const path = require('path');
const http = require('http');

const imageFilePath = path.join(__dirname, 'files', 'image.jpg'); // Path to image file

// Function to pass through readable stream
function passThroughReadableStream(req, res, filePath) {
    const readableStream = fs.createReadStream(filePath);

    // Pipe the readable stream to the response
    readableStream.pipe(res);

    // Handle errors
    readableStream.on('error', (error) => {
        console.error('Error reading file:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    // Handle end event
    readableStream.on('end', () => {
        console.log('File streaming completed');
    });
}

// Function to pass through buffer
function pasThroughBufferSetup(req, res, filePath) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Set the content type for the response
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            // Send the image data as a buffer
            res.end(data);
        }
    });
}

// Function to pass through Base64 string
// This function reads the image file and converts it to a Base64 string sending it in the response.
function passThroughBase64Setup(req, res, filePath) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Convert the image data to Base64
            const base64Image = data.toString('base64');
            // Set the content type for the response
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            // Send the Base64 string
            res.end(base64Image);
        }
    });
}

// Function to pass through URL
// This function reads the image file and sends its URL in the response.
function passThroughURLSetup(req, res, filePath) {
    // Assuming the image is hosted on the same server
    const imageUrl = `http://${req.headers.host}/files/image.jpg`; // Adjust the
    // URL based on your server configuration
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Send the image URL
    res.end(imageUrl);
}

// Function to pass through blob
// This function reads the image file and sends it as a Blob in the response.
function passThroughBlobSetup(req, res, filePath) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Set the content type for the response
            res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
            // Send the image data as a Blob
            res.end(data);
        }
    });
}

// Function to pass through Data URI
// This function reads the image file and sends it as a Data URI in the response.
// A Data URI is a base64 encoded string that represents the image.
// It can be used to embed images directly in HTML or CSS.
function passThroughDataURISetup(req, res, filePath) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Convert the image data to Base64
            const base64Image = data.toString('base64');
            // Create a Data URI
            const dataURI = `data:image/jpeg;base64,${base64Image}`;
            // Set the content type for the response
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            // Send the Data URI
            res.end(dataURI);
        }
    });
}

// create a http server to serve the image file
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Set the content type for the response
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });

        // call a readable stream to read the image file
        passThroughReadableStream(req, res, imageFilePath);
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Access the image at: http://localhost:${PORT}/files/image.jpg`);
});
