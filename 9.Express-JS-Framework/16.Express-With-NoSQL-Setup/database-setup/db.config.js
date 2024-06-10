// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const connect = await mongoose.connect(process.env.CONNECTION_STRING);
//         const connectionProperties = {
//             hostName: connect.connection.host,
//             userName: connect.connection.user,
//             dbName: connect.connection.name,
//         };
//         connect.on('error', console.error.bind(console, 'MongoDB connection error:'));
//         connect.once('open', () => {
//             console.log('Connected to MongoDB');
//         });
//         console.log(connect);

//         console.log(`Db Connected: ${connectionProperties}`);
//     } catch (error) {
//         console.log(error.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connectionProperties = {
            hostName: connection.connection.host,
            dbName: connection.connection.name,
        };

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB');
        });

        console.log(`Db Connected: ${JSON.stringify(connectionProperties, null, 2)}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
