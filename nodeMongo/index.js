const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const dbhandler = require('./dbhandler');
const url = 'mongodb://localhost:27017/mysampledb'

mongo.connect(url,{ useNewUrlParser: true },(err,client)=>{
    assert.equal(err,null);

    console.log('Connected to mongoDb Server '+client);
    const db = client.db('mysampledb');
   

    dbhandler.insertDocument(db,{name:"Chicken",description:"Butter Chicken"},'dishes',(result)=>{
console.log(result.ops);
            dbhandler.findDocuments(db,'dishes',(result)=>{

                console.log(result);

                 dbhandler.updateDocument(db,{name : "Chicken"},{description:"Tandoori"},'dishes',(result)=>{
                    console.log(result.result);
                     dbhandler.findDocuments(db,'dishes',(result)=>{
                        console.log(result);
                        dbhandler.removeDocument(db,{name: "Shahi" ,description:"Shahi Paneer" },'dishes',(result)=>{
                           

                        db.dropCollection('dishes',(result)=>{
                            console.log("Dishes collections dropped");
                            client.close();
                        });

                        });

                     });

                 });

            });


    });
 


});