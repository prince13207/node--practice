const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/mysampledb'

mongo.connect(url,{ useNewUrlParser: true },(err,client)=>{
    assert.equal(err,null);

    console.log('Connected to mongoDb Server '+client);
    const db = client.db('mysampledb');
    const collection = db.collection('dishes');


    collection.insertOne({"name":"Chicken","description":"Butter Chicken"},(err,result)=>{

        assert.equal(err,null);
        console.log("After Insertion:\n");
        console.log(result.ops);

        collection.find({}).toArray((err,result)=>{

            assert.equal(err,null);
            console.log("Documents Present:\n");
            console.log(result);

            db.dropCollection('dishes',(err,result)=>{

                assert.equal(err,null);
                console.log(result);
                client.close();
            });


        });

    });


});