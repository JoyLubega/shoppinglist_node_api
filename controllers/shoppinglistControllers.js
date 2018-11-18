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

router.post('/shoppinglist', async (req, res)=>{
    const  shoppinglist = new Shoppinglist({
        name:req.body.name,
        description: req.body.description
    });
    try{
         shoppinglist.save((err, list)=>{
             if (!err){
                res.send(list);

             }else{
                 console.log(err)
                res.status(400).send({"error":err.errors.name.message})
             }
        });
    }catch(error){
        res.send(error)

    }
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
    
    const shoppinglist = {
        name:req.body.name,
        description: req.body.description
        
    };
    try{
        Shoppinglist.findByIdAndUpdate(req.params.id, {$set: shoppinglist}, {new: true}, (err, list)=>{
            if(!err){
                res.send(list);
            }else{
                console.log('Error in Shoppinglist Update :'+ JSON.stringify(err, undefined,2))
            }

        });
    }catch(err){
        res.send(err)
    }


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