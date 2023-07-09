const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const DB_local = process.env.DATABASE_LOCAL;
const PORT = 3000 || process.env.PORT;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log('Connected successfully to database');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
