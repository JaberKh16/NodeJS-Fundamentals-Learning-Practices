const express = require('express');
const path = require('path'); // Require the 'path' module

const userRoutes = require('../routes/user-route');
const rootDir = require('../util/path');

const app = express();

// Use the static middleware to serve files from the 'public' directory
app.use(express.static(rootDir));

// to get json
app.use(express.json());

// Setup route
app.use(userRoutes);

// Correct the path in the following line
app.get('/', (request, response) => {
    const filePath = path.join(__dirname, '../', 'views', 'index.html');
    return response.sendFile(filePath);
});

// Use the correct path in the 404 handler
app.use((request, response, next) => {
    const filePath = path.join(__dirname, '../', 'views/', '404.html');
    // next();
    return response.status(404).sendFile(filePath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
