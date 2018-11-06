const express = require('express')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Shoppinglist} = require('../models/shoppinglist');

router.get('/shoppinglists', (req,res)=>{
    Shoppinglist.find((err, lists)=>{
        if (!err){
            res.send(lists);
        }else{
            console.log('Error in Retriving Shoppinglists :'+ JSON.stringify(err, undefined,2))
        }

    });
});

router.post('/shoppinglist',(req, res)=>{
    var shoppinglist = new Shoppinglist({
        name:req.body.name,
        description: req.body.description,
        date_added: req.body.date_added,
        date_created:req.body.date_created
    });
    shoppinglist.save((err, list)=>{
        if (!err){
            res.send(list);
        }else{
            console.log('Error in Adding Shoppinglist :'+ JSON.stringify(err, undefined,2))
        }
    });

});

router.get('/shoppinglist/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id)){
         res.status(400).send({'Error':'No record with given id'})}

    Shoppinglist.findById(req.params.id,(err, list)=>{
        if(!err){
            res.send(list);
        }else{
            console.log('Error in Retriving Shoppinglist :'+ JSON.stringify(err, undefined,2))
        }

    });

});

module.exports = router;