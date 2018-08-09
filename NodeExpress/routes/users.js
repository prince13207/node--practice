var express = require('express');
var usersRouter = express.Router();
var myusers = require('../model/userSchema');

/* GET users listing. */
usersRouter.post('/register', function(req, res, next) {
console.log('In register');

console.log(req.body);
  myusers.findOne({username : req.body.username})
  .then((user)=>{
    if(!user)
    {
      
      console.log(req.body.username ,req.body.password );

      myusers.create({username: req.body.username,password : req.body.password})
      .then((user)=>{
        console.log(user,'Succesfully registered!!!');
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({'register':"success","users": user});
      },(err)=>next(err));
    }
    else{
      res.statusCode=401;
      res.setHeader('Content-Type','application/json');
      res.json({'register':'user exists'});
    }
  },(err)=>next(err))
  .catch((err)=>next(err));

});

usersRouter.post('/login',function(req,res,next){
  if(!req.session.user)
  {var authHeader=  req.headers.authorization;
  if(authHeader)
      {
          
          var usrDetails = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
          var usrName = usrDetails[0];
          var pswd = usrDetails[1];
          myusers.findOne({username : usrName})
          .then((user)=>{
            if(user)
             {
               if(user.username===usrName && user.password === pswd  )
               {
                 req.session.user="authenticated";
                 res.statusCode=200;
                 res.setHeader('Content-Type','application/json');
                 res.json({'login':'success'});
               }
               else if(user.password ==! pswd)
               {
                res.statusCode=401;
                err = new Error('Password Incorrect');
                return next(err);
               }
             }
             else{
               err = new Error('User does not exist');
               res.statusCode=401;
               next(err);
             }
          })
          .catch((err)=>next(err));
  
      }
   else{
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
   }   
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
}


);

module.exports = usersRouter;
