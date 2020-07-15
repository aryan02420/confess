if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}
const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, auto_reconnect: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connection success');
});