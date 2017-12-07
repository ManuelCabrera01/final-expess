const mongoose = require('mongoose');
const dbName = 'cycling';

// connect to the database
mongoose.connect(`mongodb://localhost/${dbName}` , { useMongoClient: true }); //fixes Deprecation Warning

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${dbName} database`);
});
