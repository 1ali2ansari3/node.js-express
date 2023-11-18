const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('MongoDB connected successfully.');
});


module.exports = db
