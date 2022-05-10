const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // this command reads our variables from the file & saves them into Node.js environment variables

const app = require('./app');

// Start server:
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on ${port}`);
});