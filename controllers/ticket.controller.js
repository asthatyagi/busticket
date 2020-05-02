const Ticket=require('../models/ticket.model');
const objectId = require('mongodb').ObjectID;




exports.addTicket=async(req,res,next)=>{
    try{
     const body={
         ...req.body
     };
     if (body) {
         const saveTicket = await new Ticket(body).save();
         if (saveTicket) {
             return res.status(200).json({
                 Body: 'TICKET_ADDED'
             });
         } else {
             return res.status(400).json({
                 Body: 'TICKET_COULD_NOT_BE_ADDED'
             });
         }
     } else {
         return res.status(400).json({
             Body: 'PLEASE_ENTER_DETAILS'
         });
     }
    }
    catch(e){
     return res.status(500).json({
         Body: 'NETWORK_ERROR'
     });
    }
 }


 // listing tickets according to status

 exports.listTicket = async (req, res, next) => {
	try {
		let { status } = req.query;
		const result = await Faq.find({})
		if (result) {
			
			return res.status(200).json({
				result
			});
		} else {
			return res.status(400).json({
				Body: 'TICKET_NOT_FOUND'
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			Body: 'NETWORK_ERROR'
		});
	}
};

// ticket status

exports.oneTicket = async (req, res) => {
	try {
		const id = req.ticket._id;
		if (id === undefined || id === '') return res.status(400).json({ Body: 'INVALID_ID' });

		let ticket = await Ticket.findById(id);

		if (ticket)
			res.status(200).json({
				Body: ticket
			});
		else
			res.status(204).json({
				Body: 'NO_TICKET_FOUND'
			});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			Body: 'NETWORK_ERROR'
		});
	}
};