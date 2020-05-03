const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoute = require('./routes/user.route');
const ticketRoute = require('./routes/ticket.route');

app.use('/', userRoute);
app.use('/', ticketRoute);

mongoose.connect(
    'mongodb+srv://astha:astha@cluster-ina3i.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => console.log('connected to db')
);

mongoose.connection.on('error', err => {
    console.log("error connecting to Database");
    process.exit(-1);
});

app.listen(process.env.PORT || 3000);