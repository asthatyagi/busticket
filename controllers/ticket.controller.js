const Ticket=require('../models/ticket.model');
const objectId = require('mongodb').ObjectID;
const User=require('../models/user.model');


exports.addTicket=async(req,res,next)=>{
    try{
	 let{userId,seatNo,status,price,Date}=req.body
	  let seatTaken=await Ticket.findOne({seatNo})
	  if(seatTaken){
		  res.status(400).json({
			  Body:'THIS_SEAT_IS_ALREADY_BOOKED'
		  })
	  }

	  let ticketSaved=await new Ticket({
		 userId,
		 status,
		 seatNo,
		 price,
		 Date
	  }).save()

	  if(ticketSaved){
		  res.status(200).json({
			  Body:'TICKET_	ADDED'
		  })
	  }
else{
	res.status(400).json({
		Body:"TICKET_CANNOT_BE_ADDED"
	})
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
		const result = await Ticket.find({status})
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
		
		 const {id }= req.query;
		 if (id === undefined || id === '') return res.status(400).json({ Body: 'INVALID_ID' });

		let ticket = await Ticket.findById(id).select({"status":1,"_id":0});

		if (ticket)
			res.status(200).json({
				Body: ticket
			});
		else
			res.status(204).json({
				Body: 'NO_TICKET_FOUND'
			});
	} catch (e) {
		
		return res.status(500).json({
			Body: 'NETWORK_ERROR'
		});
	}
};

// info of person owning the ticket

exports.personInfo=async(req,res)=>{
  try{

	const{id}=req.query // ticket id
	const result=await Ticket.findById(id).select({'userId':1,'_id':0})
	 console.log(result)
	 const userDetails=await User.findById(result.userId)
	// console.log(userDetails)
	if(userDetails){
		res.status(200).json({
			Body:userDetails
		})
	}

  }
  catch(e){
	  console.log(e)
	return res.status(500).json({
		Body: 'NETWORK_ERROR'
	}); 
  }
}

// updating the ticket status

exports.ticketStatus=async(req,res)=>{
	try{ 
		const{status,id}=req.query
		if(status==='closed'){
			const result=await Ticket.findByIdAndUpdate(id,{
				$set:{
					"status":'open',
					"userId":null
				}
			})
			if(result){ 
				res.status(200).json({
					Body:result
				})
			}
		}
		else if(status==='open'){
			const{firstName,lastName,email,phone}=req.query
			const info=await new User({
				firstName,
				lastName,
				email,
				phone

			}).save(async function(err,userId){
				const result2=	await Ticket.findByIdAndUpdate(id,{
						$set:{
							status:'closed',
							userId:userId
						}
					})
				if(result2){
					res.status(200).json({
						Body:result2
					})
				}
			})

		}

	}
	catch(e){
		console.log(e)
	  return res.status(500).json({
		  Body: 'NETWORK_ERROR'
	  }); 
	}

}


exports.openAll=async(req,res)=>{
	try{
	const result=await	Ticket.updateMany(
			{ status: "closed" },
			{ $set: { "status": 'open' ,"userId":null} }

		  )
		  if(result){
			  res.status(200).json({
				  Body:result
			  })
		  }

	}
	catch(e){
		console.log(e)
	  return res.status(500).json({
		  Body: 'NETWORK_ERROR'
	  }); 
	}
}