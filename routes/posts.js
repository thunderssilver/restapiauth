
const router=require('express').Router();
const verify=require('./verifyToken');
const User=require('../models/User');
router.get('/',verify,(req,res) =>{//verify here acts as middleware
/*
	res.json({


		posts: {

			title: 'my first post',
			description: 'random data you shouldnt access'
		}
	});
*/
	res.send(req.user);
	const us=User.findOne({_id:req.user._id})
	console.log(us);
});

module.exports=router;