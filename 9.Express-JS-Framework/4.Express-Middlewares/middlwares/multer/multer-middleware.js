const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// Set up Multer storage and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory where you want to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Set the filename to be unique
    },
});

const upload = multer({ storage });

// Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileInfo = {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
    };

    return res
        .status(200)
        .json({ success: true, message: 'File uploaded successfully', file: fileInfo });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
