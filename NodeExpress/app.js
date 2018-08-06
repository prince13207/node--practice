var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoRouter= require('./routes/promoRouter');
var leaderRouter=require('./routes/leaderRouter');

var app = express();

const url = 'mongodb://localhost:27017/mysampledb';

const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db)=>{

    console.log('Connected to database');
},(err)=>{
    console.log(err);

}).catch((err)=>{
    console.log(err);
})

var auth = function(req,res,next){
  var authHeader=  req.headers.authorization;
if(!req.signedCookies.user)
{if(authHeader)
    {
        console.log(new Buffer(authHeader.split(' ')[1],'base64').toString);
        var usrDetails = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
        var usrName = usrDetails[0];
        var pswd = usrDetails[1];
        
        if(usrName==='admin' && pswd === '1234')
            {
                
                res.cookie('user','admin',{signed : true});
                next();
            }
        else
        {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
        }
    }
 else{
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
 }   
}
else{
    if(req.signedCookies.user='admin')
        {
            next();

        }
    else {
        var err = new Error('You are not authenticated!');
        
        err.status = 401;
        next(err);
    }
}

}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));
//add a middleware for authentiation
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/leaders',leaderRouter);
app.use('/promotions',promoRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
