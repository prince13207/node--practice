const express= require('express');
const http = require('http');

const app=express();


app.use((req,res,next)=>{

console.log(req.header());
res.end('<html><body><h1>This is Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(3000,'localhost',()=>{

    console.log('Express Server started at localhost port 3000');
})

