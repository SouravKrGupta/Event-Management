const express=require('express');
const { addTicket, removeTicket, getTicket, updateTicket, getAllTicket} = require('../controller/ticketController');


const ticketRouter =express.Router();

ticketRouter.post('/add',addTicket);
ticketRouter.post('/remove/:id',removeTicket);
ticketRouter.get('/get/:id',getTicket);
ticketRouter.get('/get',getAllTicket)
ticketRouter.put('/update/:id',updateTicket)

module.exports=ticketRouter;