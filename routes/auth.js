
const router=require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {registerValidation,loginValidation} =require('../validation');

//register
router.post('/register',async(req,res)=>{
//res.send('Register');

//lets validate the data before we get a user
const {error} = await registerValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);


//checking if the user is already in the database

const emailExist=await User.findOne({email:req.body.email});
if(emailExist) return res.status(400).send('Email already exists');


//hash passwords
const salt=await bcrypt.genSalt(10);
const hashedpassword=await bcrypt.hash(req.body.password,salt);

//create a new user

const user=new User({

	name:req.body.name,
	email:req.body.email,
	password:hashedpassword
});


try{

	const savedUser=await user.save();
	//res.send({
	//	user:user._id()
	//});
	res.send(savedUser);
}catch(err){
	res.status(400).send(err);
}

//res.send("Register");
});




//login
router.post('/login',async(req,res)=>{
//lets validate the data before we get a user
const {error} = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);


//checking if the email exist
const user=await User.findOne({email:req.body.email});
if(!user) return res.status(400).send('Email or password is wrong/Email is not found');
//password is correct

const validPass=await bcrypt.compare(req.body.password,user.password);
if(!validPass) return res.status(400).send('Invalid password')


//create and assign a token

const token=  jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
res.header('auth-token',token).send(token);
res.send('Logged in');

});


module.exports=router;