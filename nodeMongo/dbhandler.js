const assert = require('assert');

exports.insertDocument = (db,document, coll ,callback )=>{
 const collection =db.collection(coll);
 return collection.insertOne(document);
};

exports.findDocuments = (db,coll , callback)=>{
    const collection =db.collection(coll);

  return  collection.find({}).toArray();

};

exports.updateDocument = (db,document,update,coll, callback)=>{
    const collection =db.collection(coll);
  return  collection.updateOne(document,{$set:update},null);
};

exports.removeDocument = (db,document,coll , callback)=>{
    const collection =db.collection(coll);
   return collection.deleteOne(document);

};