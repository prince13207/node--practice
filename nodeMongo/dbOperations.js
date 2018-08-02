const mongoose = require('mongoose');

const Dishes = require('./dishSchema');

const url = 'mongodb://localhost:27017/mysampledb';

mongoose.connect(url).then(
    (db)=>{
        console.log('Connected correctly to server');

    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    })}
);

newDish.save()
.then((dish)=>{

    console.log(dish +" saved");
    return Dishes.find({});
})
.then((dishes)=>{

console.log(dishes);

return Dishes.remove({});

})
.then(()=>{
    mongoose.connection.close();
})
.catch((err)=>{
    console.log(err);
});