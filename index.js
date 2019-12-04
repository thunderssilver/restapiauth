
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
//connect to db
mongoose.connect(process.env.DB_CONNECT,
	{ useNewUrlParser: true },()=>console.log('connected to db'));


//{ useUnifiedTopology: true },
//{urlNewParser:true},


//Import routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');

//middleware
app.use(express.json());//now in latest version body-parser comes in build in expressjs
//route middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
//or
//app.get(......)

app.listen(4000,()=>console.log('Server up and running'));  