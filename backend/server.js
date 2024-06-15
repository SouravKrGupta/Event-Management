const express =require('express')
const colors =require('colors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const mySqlPool=require('./config/db')
const cors =require('cors')
//configure dotenv
dotenv.config()
//routes import 
const userRouter =require('./routes/userRoute')
const eventRouter=require('./routes/eventRoute')
const attendeesRouter=require('./routes/attendeesRoute')
const feedbackRouter=require('./routes/feedbackRoute')
const ticketRouter=require('./routes/ticketRoute')

//rest object
const app=express()

//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
// static file serving middleware
app.use("/image", express.static('uploads'));
//routes
app.use('/api/v1/user',userRouter);
app.use('/api/v1/event',eventRouter)

app.use('/api/v1/attendee',attendeesRouter);
app.use('/api/v1/feedback',feedbackRouter)
app.use('/api/v1/ticket',ticketRouter)
app.get('/test',(req,res)=>{
    res.status(200).send("<h1>Event Management project</h1>")
});

//port 
const PORT =process.env.PORT || 8080;

//contidionaly Listen
mySqlPool.query('SELECT 1').then(()=>{
//MYSQL
console.log('MY SQl DB Connected'.bgCyan.white);
//listen
app.listen(PORT,()=>{
    console.log(`Server Started on http://localhost:${PORT}`.bgMagenta.white);
})
})
.catch((error)=>{
    console.log(error)
})
