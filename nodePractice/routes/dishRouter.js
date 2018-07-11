const express=require('express');
const bodyParser=require('body-parser');


const dishRouter= express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.all((req,res,next)=>{
    
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
 
    res.end('Sending all dishes');

})
.post((req,res,next)=>{
  
    res.end('Adding dishes '+req.body.name+' description '+req.body.description);

})
.put((req,res,next)=>{
    console.log(req.params.dishId);
    res.statusCode=403;
    res.end('This operation not supported');

})
.delete((req,res,next)=>{
    console.log(req.params.dishId);
    res.end('Deleting all dishes');

});


dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('type','text/plain');
    next();
})
.get((req,res,next)=>{

    res.end('Sending dish '+req.params.dishId);

})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Operation not suported for dishes/'+req.params.dishId);

})
.put((req,res,next)=>{

    res.write('Updating dish for '+req.params.dishId+'\n');

    res.end('Updating dish item for '+req.body.name+' with details '+req.body.description);

})
.delete((req,res,next)=>{

    res.end('Deleting dish '+req.params.dishId);

});

module.exports=dishRouter;