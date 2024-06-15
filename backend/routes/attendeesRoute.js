const express=require('express');
const { addAttendees, removeAttendees, getAttendees, updateAttendees, getALLAttendees } = require('../controller/attendeesController');

const attendeesRouter =express.Router();

attendeesRouter.post('/add',addAttendees);
attendeesRouter.post('/remove/:id',removeAttendees);
attendeesRouter.get('/get',getAttendees);
attendeesRouter.get('/allget',getALLAttendees)
attendeesRouter.put('/update/:id',updateAttendees)

module.exports=attendeesRouter;