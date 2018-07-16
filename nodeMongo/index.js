const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const dbhandler = require('./dbhandler');
const url = 'mongodb://localhost:27017/mysampledb'

mongo.connect(url,{ useNewUrlParser: true })
        .then((client)=>{
                const db = client.db('mysampledb');
   

                dbhandler.insertDocument(db,{name:"Chicken",description:"Butter Chicken"},'dishes')
        .then((result)=>{
                console.log(result.ops)
                return dbhandler.findDocuments(db,'dishes')})
        .then((result)=>{

                console.log(result);

                return dbhandler.updateDocument(db,{name : "Chicken"},{description:"Tandoori"},'dishes')})
        .then((result)=>{
                console.log(result.result);
                return  dbhandler.findDocuments(db,'dishes')})
        .then((result)=>{
                console.log(result);
                return dbhandler.removeDocument(db,{name: "Shahi" ,description:"Shahi Paneer" },'dishes')})
        .then((result)=>{
                           

                return db.dropCollection('dishes')})
        .then((result)=>{
                console.log("Dishes collections dropped");
                 client.close();
        })
        .catch((err) => console.log(err));
    }).catch((err) => console.log(err));

                    