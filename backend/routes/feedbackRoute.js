const express=require('express');
const { addFeedback, removeFeedback, getFeedback, updateFeedback } = require('../controller/feedbackController');


const feedbackRouter =express.Router();

feedbackRouter.post('/add',addFeedback);
feedbackRouter.post('/remove/:id',removeFeedback);
feedbackRouter.get('/get',getFeedback);
feedbackRouter.put('/update/:id',updateFeedback)

module.exports=feedbackRouter;