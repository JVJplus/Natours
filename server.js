const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({
  path: './config.env'
});

// Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

try {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('DB connection successful!');
    });
} catch (err) {
  console.log(err);
}

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
