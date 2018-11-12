const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
const shoppinglistController = require('./controllers/shoppinglistControllers.js')
const itemController = require('./controllers/itemController.js');


const app = express();
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, ()=> console.log("Server started at port : 3000"))

app.use('/api', shoppinglistController);
app.use('/api/shoppinglist', itemController);