const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shoppinglists',(err)=>{
    if (!err)
        console.log('MongoDb connection succeedded');
    else
    console.log('Error in Db connection: ' + JSON.stringify(err, undefined,2));

});

module.exports = mongoose;