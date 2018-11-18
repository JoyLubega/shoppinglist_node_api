const mongoose = require('mongoose');
//mongodb://joyceN:wisdominGod2@ds159563 .mlab.com:59563/shoppinglists
mongodb://joyceN:wisdominGod2@ds159563.mlab.com:59563/shoppinglists
mongoose.connect('mongodb://localhost:27017/shoppinglists',(err)=>{
    if (!err)
        console.log('MongoDb connection succeedded');
    else
    console.log('Error in Db connection: ' + JSON.stringify(err, undefined,2));

});

module.exports = mongoose;