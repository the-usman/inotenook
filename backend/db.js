const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017"


async function connectToMongoDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/inotebook', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectToMongoDb
