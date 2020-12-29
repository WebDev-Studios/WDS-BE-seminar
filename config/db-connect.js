const mongoose = require('mongoose');

const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };
const dbName = 'myapi';
const dbHost = 'localhost';
const dbPort = 27017;

// Tao connection toi database
function connect() {
    mongoose.connect(process.env.DB_CONNECTION_STRING || `mongodb://${dbHost}:${dbPort}/${dbName}`, mongooseOptions, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Ket Noi Thanh Cong Toi Database !');
        }
    });
}

module.exports.connect = connect;