const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const Shoppinglist = require('../models/shoppinglist');

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

router.put('/shoppinglist/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id)){
         res.status(400).send({'Error':'No record with given id'})}
    
    var shoppinglist = {
        name:req.body.name,
        description: req.body.description,
        date_added: req.body.date_added,
        date_created:req.body.date_created
    };
    Shoppinglist.findByIdAndUpdate(req.params.id, {$set: shoppinglist}, {new: true}, (err, list)=>{
        if(!err){
            res.send(list);
        }else{
            console.log('Error in Shoppinglist Update :'+ JSON.stringify(err, undefined,2))
        }

    });

});

router.delete('/shoppinglist/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id)){
         res.status(400).send({'Error':'No record with given id'})}
    

    Shoppinglist.findByIdAndRemove(req.params.id, (err, list)=>{
        if(!err){
            res.send({"Message":"SHoppinglist has been deleted"});
        }else{
            console.log('Error in Shoppinglist Update :'+ JSON.stringify(err, undefined,2))
        }

    });

});



module.exports = router;