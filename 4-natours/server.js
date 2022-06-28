const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' }); // this command reads our variables from the file & saves them into Node.js environment variables

// We configure MongoDB in this serrver file:
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('DB connection successful'));


// Start server:
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on ${port}`);
});
