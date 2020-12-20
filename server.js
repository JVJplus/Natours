const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({
  path: './config.env'
});

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A tour must have a name']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  rating: {
    type: Number,
    defaultValue: 4.5
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The world of JVJplus',
  price: 95653,
  rating: 5
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('ERROR: ', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
