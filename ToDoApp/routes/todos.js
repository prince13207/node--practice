const express = require('express');
const mongoose = require('mongoose');
var todoRouter = express.Router();
var Item = require('../model/itemSchema');

todoRouter.route('/')
.get((req,res,next)=>{
Item.find({})
.then((items)=>{
res.statusCode=200;
res.setHeader('Content-Type','application/json');
res.json(items);
},(err)=>{
    next(err);
})
.catch((err)=>next(err));

})

.post((req,res,next)=>{
    Item.create(req.body)
    .then((item)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>{
        next(err);
    })
    .catch((err)=>next(err));


})

.put((req,res,next)=>{
    res.statusCode=403;
    res.setHeader('Content-Type','application/text');
    res.end('Operation not supported');
})

.delete((req,res,next)=>{

    res.statusCode=403;
    res.setHeader('Content-Type','application/text');
    res.end('Operation not supported');

})


todoRouter.route('/:itemId')
.get((req,res,next)=>{
    Item.findById(req.params.itemId)
    .then((item)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>{
        next(err);
    })
    .catch((err)=>next(err));


})

.post((req,res,next)=>{
    res.statusCode=403;
    res.setHeader('Content-Type','application/text');
    res.end('Operation not supported');

})

.put((req,res,next)=>{
    Item.findByIdAndUpdate(req.params.itemId,{$set: req.body})
    .then((item)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>{
        next(err);
    })
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{
    Item.findByIdAndRemove(req.params.itemId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>{
        next(err);
    })
    .catch((err)=>next(err));
})

module.exports= todoRouter;