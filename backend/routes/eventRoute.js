const express=require('express');
const multer=require('multer');
const { addEvent, removeEvent,  updateEvent, getAllEvents, getEventById, searchEvents } = require('../controller/eventController');

const eventRouter=express.Router();

//Image Storage Engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})


eventRouter.post('/add',upload.single('image'),addEvent)
eventRouter.post('/remove/:id',removeEvent)
eventRouter.get('/get',getAllEvents)
eventRouter.get('/get/:id',getEventById)
eventRouter.put('/update/:id',upload.single('image'),updateEvent)
eventRouter.get('/search',searchEvents);
module.exports=eventRouter