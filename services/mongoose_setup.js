if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}
const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_dbURI || 'mongodb://localhost/bpgc', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connection success');
});