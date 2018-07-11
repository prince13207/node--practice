const express= require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser =require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter= require('./routes/promoRouter');
const leaderRouter=require('./routes/leaderRouter');
const app=express();

app.use(morgan('dev'));
app.use('/dishes',dishRouter);
app.use('/leaders',leaderRouter);
app.use('/promotions',promoRouter);
app.use(express.static(__dirname +'/public'));


const server = http.createServer(app);

server.listen(3000,'localhost',()=>{

    console.log('Express Server started at localhost port 3000');
})

