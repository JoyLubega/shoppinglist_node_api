const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const Item = require('../models/item');
const Shoppinglist = require('../models/shoppinglist');

router.get('/:id/items', async (req,res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).send({'Error':'No record with given id'})
    }
    
    const shopList = await Shoppinglist.findById(req.params.id)
    try{
        if (shopList) {
            const items = await Item.find({list: req.params.id})
            return res.send(items);
        }
        
    } catch {
        res.status(404).json({
            message: `shoplitst with id ${req.params.id} does not exist`
        })
    }
});

router.get('/:id/item/:iid', async (req,res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).send({'Error':'No record with given id'})
    }
    const shoppingList = await Shoppinglist.findById(req.params.id)
    try{
        if (shoppingList) {
            const item = await Item.findById(req.params.iid)
            return res.send(item);
        }
    }catch(err){
        res.status(404).json({
            message: `shoplitst with id ${req.params.iid} does not exist`
        })
    }

});

router.post('/:id/item', (req,res)=>{
    
    const item = new Item({
        name:req.body.item,
        list: req.params.id
    });
    try{
        item.save((err, item)=>{
            if (!err){
                res.status(201);
                res.send({"item":item, "message":"Item Added"});
            }else{
                console.log('Error in Adding item :'+ JSON.stringify(err, undefined,2))
            }
        });
    }catch(err){
        res.send(err)

    }
});

router.put('/:id/item/:iid',(req, res)=>{
    if (!ObjectId.isValid(req.params.id)){
         res.status(400).send({'Error':'No record with given id'})}
    
    const newItem   = {
        name:req.body.item
    };
    try{
        Item.findByIdAndUpdate(req.params.iid, {$set: newItem}, {new: true}, (err, item)=>{
            if(!err){
                res.send(item);
            }else{
                console.log('Error in Shoppinglist Update :'+ JSON.stringify(err, undefined,2))
            }

        });
    }catch(err){
        res.send(err)
    }

});

router.delete('/:id/item/:iid',(req, res)=>{
    if (!ObjectId.isValid(req.params.id)){
         res.status(400).send({'Error':'No record with given id'})}
    
    Item.findByIdAndRemove(req.params.iid, (err, item)=>{
        if(!err){
            res.send({"Message":"Item has been deleted"});
        }else{
            console.log('Error in Shoppinglist Update :'+ JSON.stringify(err, undefined,2))
        }
    });
});


module.exports = router;