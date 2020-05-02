const mongoose = require('mongoose');
const id = mongoose.Schema.Types.ObjectId;
const date = mongoose.Schema.Types.Date;

const ticketSchema=new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
   },
   seatNo:{
     type:Number,
     required:true
   },
   status:{
     type:String,
     enum:[
         'closed',
         'open',
     ],
     required:true
   },
   price:{
    type:Number,
    required:true
   },
   Date:{
    type:date,
    required:true
   }
},
{timestamps:true}

)









//personid,ticket,seatno,price,dates,status