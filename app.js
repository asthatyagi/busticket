const express= require('express');
const app=express();
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
//mongoose.connect();

//require('dotenv/config')
// const cors = require('cors');
// const helmet = require('helmet');
// const methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(methodOverride());

// // enable CORS - Cross Origin Resource Sharing
// app.use(cors());

const userRoute=require('./routes/user.route');
const ticketRoute=require('./routes/ticket.route');

app.use('/',userRoute);
app.use('/',ticketRoute);

mongoose.connect(
'mongodb://localhost:27017/bus-ticket',
{useNewUrlParser:true},
()=>console.log('connected to db')
);

mongoose.connection.on('error', err => {
	// logger.error(`MongoDB connection error: ${err}`);
	process.exit(-1);
});

app.listen(3000);