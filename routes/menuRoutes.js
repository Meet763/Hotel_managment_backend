const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');

router.post('/', async (req, res) => {
    try{
        const data = req.body
        const newmenuItem = new menuItem(data)

        const responce = await newmenuItem.save();
        console.log('data saved')
        res.status(200).json(responce)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await menuItem.find();
        console.log('data fetched')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
    
})

router.get('/:tasteType', async(req, res) => {
    try{
        const tasteType = req.params.tasteType
        if( tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'medium'){
            const responce = await menuItem.find({taste: tasteType})
            console.log('data fetched')
            res.status(200).json(responce)
        }else{
            res.status(404).json({error: 'invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }

})

module.exports = router;