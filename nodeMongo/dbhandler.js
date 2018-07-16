const assert = require('assert');

exports.insertDocument = (db,document, coll , callback)=>{
 const collection =db.collection(coll);
 collection.insertOne(document,(err,result)=>{

    assert.equal(err,null);
   console.log ("Inserted Documents "+ result.result.n+" in the collection "+ coll);

   callback(result);
 }
);
};

exports.findDocuments = (db,coll , callback)=>{
    const collection =db.collection(coll);

    collection.find({}).toArray((err,result)=>{

        assert.equal(err,null);
        console.log('Found Collections :');
       
        callback(result);
    });

};

exports.updateDocument = (db,document,update,coll, callback)=>{
    const collection =db.collection(coll);
    collection.updateOne(document,{$set:update},null,(err,result)=>{
        assert.equal(err,null);

        console.log('Updating Document with ' + update );
        callback(result);

    });
};

exports.removeDocument = (db,document,coll , callback)=>{
    const collection =db.collection(coll);
    collection.deleteOne(document,(err,result)=>{
        console.log('Deleted Document'+document.name );

        callback(result);
    });

};