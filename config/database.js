const mongoose = require('mongoose');
require('dotenv').config();
const { Console } = require('winston/lib/winston/transports');

/*
 * function to connect mongoose database
 * @returns connection
 */
function dbconnect() {
  

console.log("DB---->",process.env.DATABASE_URL)

  // eslint-disable-next-line no-unused-expressions
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
}

module.exports = dbconnect;
