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

// // Create a new document out of the Tour model
// const testTour = new Tour({
//     name: 'The Park Camper',
//     price: 997
// })

// // Create an instance of the model by saving it:
// testTour.save().then(doc => {
//     console.log(doc);
// }).catch(err =>  {
//     console.log('Error! :', err);
// })

// Start server:
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on ${port}`);
});
