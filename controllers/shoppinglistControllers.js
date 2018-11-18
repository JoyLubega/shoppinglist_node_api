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

router.post('/shoppinglist',  (req, res)=>{
    const  shoppinglist = new Shoppinglist({
        name:req.body.name,
        description: req.body.description
    });

    if (req.body.name == ""){
        return res.status(400).json({
            'Message': `Shoppinglist Name cant be empty!`} );

    }

    Shoppinglist.find({'name':req.body.name},(err,list)=>{
        console.log(list)
        if (list.length >0){
            return res.status(201).json({
                'Message': `Shoppinglist exists!, ${req.body.name }`} );
        }else{
            const slist= shoppinglist.save()
            return res.status(201).json({
                'Message': `Shoppinglist successfully added!, ${req.body.name }`});
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