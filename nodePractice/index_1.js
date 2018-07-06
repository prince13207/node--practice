const http= require('http');
const fs=require('fs');
const path = require('path'); 

const server= http.createServer((req,res)=>{
console.log(req.url);
if(req.url=='/') fileUrl= '/index.html'
else fileUrl=req.url;

filePath= path.resolve('./public'+fileUrl);

fs.exists(filePath,(exists)=>{
if(!exists)
{    res.statusCode=404;
    res.setHeader('Content-Type','text/html');
   
    res.end('<html><body><h1>The file does not exists</h1></body></html>');
    return;
}
else
{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream(filePath).pipe(res);

}
})




})


server.listen(3000,'localhost',()=>{
    console.log("Server Started at port: 3000");
});