const express = require('express');

// creating instance of express
const app = express();

// setup port number
const PORT = process.env.PORT || 3000;
// setup routes
app.get('/', (req, res) => {
    res.send('Welcome to the page');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, userName: 'adi', displayName: 'Adi' },
        { id: 2, userName: 'mark', displayName: 'Mark' },
        { id: 4, userName: 'niyal', displayName: 'Niyal' },
    ];
    res.send({ users });
});

app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
