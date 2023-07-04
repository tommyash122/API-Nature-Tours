const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = 3000 || process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
