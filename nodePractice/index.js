const express= require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser =require('body-parser');


const app=express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.all('/dishes',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
});


app.get('/dishes',(req,res,next)=>{

    res.end('Sending all dishes');

});

app.post('/dishes',(req,res,next)=>{

    res.end('Adding dishes '+req.body.name+' description '+req.body.description);

});
app.put('/dishes',(req,res,next)=>{

    res.statusCode=403;
    res.end('This operation not supported');

});


app.delete('/dishes',(req,res,next)=>{

    res.end('Deleting all dishes');

});



app.all('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('type','text/plain');
    next();
});


app.get('/dishes/:dishId',(req,res,next)=>{

    res.end('Sending dish '+req.params.dishId);

});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403;
    res.end('Operation not suported for dishes/'+req.params.dishId);

});
app.put('/dishes/:dishId',(req,res,next)=>{

    res.write('Updating dish for '+req.params.dishId+'\n');

    res.end('Updating dish item for '+req.body.name+' with details '+req.body.description);

});


app.delete('/dishes/:dishId',(req,res,next)=>{

    res.end('Deleting dish '+req.params.dishId);

});
app.use(express.static(__dirname +'/public'));


const server = http.createServer(app);

server.listen(3000,'localhost',()=>{

    console.log('Express Server started at localhost port 3000');
})

