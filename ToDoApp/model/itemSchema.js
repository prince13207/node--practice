const mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({

name :{
    type : String,
    require : true,
    unique : true
} 
,
time : {
    type : String,
    require : true
},
priority :{
    type : String,
    reuire : true
},
comments : {
    type:  String,
    default : ''
}

});

var Items = mongoose.model('item',itemSchema);

module.exports= Items;