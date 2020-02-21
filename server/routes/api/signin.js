const User = require('../../models/user');

const userSession=require('../../models/usersession');

module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //   Counter.find()
    //     .exec()
    //     .then((counter) => res.json(counter))
    //     .catch((err) => next(err));
    // });
  
    // app.post('/api/counters', function (req, res, next) {
    //   const counter = new Counter();
  
    //   counter.save()
    //     .then(() => res.json(counter))
    //     .catch((err) => next(err));

    /*
    signup
    */

    app.post('/api/account/signup',(req,res, next)=>{
        const { body } = req;
        const{
            firstName,
            lastName,
            password
        } = body;
        let{
            email 
        }=body;

        if (!firstName) {
            return res.send({
            success: false,
            message: 'Error: Missing FirstName cannot be blank.'
            })  
        }

        if (!lastName) {
            return res.send({
            success: false,
            message: 'Error: Missing lastName cannot be blank.'
            })  
        }

        if (!email) {
            return res.send({
            success: false,
            message: 'Error: email cannot be blank.'
            })  
        }
        if(!password){
            return res.send({
            success: false,
            message: 'Error: password cannot be blank.'
            })  
        }
        console.log('here');
        email=email.toLowerCase();

        User.find({
            email: email
        },(err,previousUser) =>{
            if (err) {// if error exist
                return res.send({
                    success:false,
                    message:'Error: Server error'
                });
            }else if (previousUser.length>0) {// if the user already exist
                return res.send({
                    success:false,
                    message:'Error:Account already exist'
                });
            }

            // save the new user 
            const newUser = new  User();
            newUser.email= email;
            newUser.firstName=firstName;
            newUser.lastName=lastName;
            newUser.password=newUser.generateHash(password);
            newUser.save((err,user)=>{
                if (err) {
                    return res.send({
                        success:false,
                        message:'Error: Server error'
                    });
                }
                return res.send({
                    success:true,
                    message:'Signed up'
                });
            });
        });
    });

    app.post('/api/account/signin',(req,res, next)=>{
        const { body } = req;
        const{
            password
        } = body;
        let{
            email 
        }=body;

        if (!email) {
            return res.send({
            success: false,
            message: 'Error: email cannot be blank.'
            })  
        }
        if(!password){
            return res.send({
            success: false,
            message: 'Error: password cannot be blank.'
            })  
        }
         email=email.toLowerCase();
        User.find({
            email:email
        }, (err,users) => {
            if (err) {
                console.log(err)
                return res.send({
                    success:false,
                    message:'Error : Server error'
                });
            }
            if(users.length!=1){//if we find the zero user 
                return res.send({
                    success:false,
                    message:'Error: Invalid'
                });
            }
            const user =users[0];
            if (!user.validPassword(password)) {// these are the condition in which user does not login
                return res.send({
                    success:false,
                    message:'Error : Invalid'
                })
            }
            //create the new user session
            const us1 =new userSession();

            us1.userId = user._id;

            us1.save((err,doc) => {
                if (err) {
                    console.log(err)
                    return res.send({
                        success: false,
                        message:'Error: Server error '
                    })
                }

                return res.send({
                    success:true,
                    message:'valid signin',
                    token:doc._id
                })
            });
        });   
    });

    app.get('/api/account/verify',(req, res, next) =>{
        // get the token 

        const {query}=req;
        const {token}=query;
        //?token=test
        //verify the token is one of a kind 

        userSession.find({
            _id:token,
            isDeleted:false
        }, (err,sessions)=>{
            if (err) {
                console.log(err)
                console.log(sessions)
                return res.send({
                    success:false,
                    message:'Error: Server error'
                })
            }

            // if (sessions.length != 1) {
            //     return res.send({
            //         success:false,
            //         message:'Error :Invalid'
            //     }) 
            // }
            else{  
                return res.send({
                    success:true,
                    message:'Good'
                })
            }
        });
    });

    app.get('/api/account/logout',(req,res,next)=>{

        const {query} =req;
        const {token} =query;

        userSession.findOneAndUpdate({
            _id : token,
            isDeleted:false
        }, {
            $set:{
                isDeleted:true
            }
        } , null, (err, sessions)=>{
            if (err) {
                console.log(err);
                return res.send({
                    success:false,
                    message:'Error:Server error'
                })
            }
                return res.send({
                    success:true,
                    message:'Good'
                })
        });
    });
};