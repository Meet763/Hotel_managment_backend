const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/Signup', async (req, res) => {
    try{
        const data = req.body
        const newPerson = new person(data)

        const responce = await newPerson.save();
        console.log('data saved')

        const payload = {
            id: responce.id,
            username: responce.username,
            password: responce.password
        }

        const token = generateToken(payload);
        console.log("token is:" + token);
        res.status(200).json({responce: responce, token: token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body;

        const user = await person.findOne({username: username})

        if(!user || !( await user.comparePassword(password))){
            res.status(401).json({error: 'invalis username 0r password'})
        }

        const payload = {
            id: user.id,
            username: user.username,
            password: user.password
        }

        const token = generateToken(payload);

        res.json({token});
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await person.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }

})

router.get('/', jwtAuthMiddleware, async (req, res) => {
    try{
        const data = await person.find();
        console.log('data fetched')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
    
})

router.get('/:workType', async(req, res) => {
    try{
        const workType = req.params.workType
        if( workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const responce = await person.find({work: workType})
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

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person
    
        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        if (!response){
            return res.status(404).json({ error: 'Person not found' }) ;
        }

        console. log ('data updated') ; 
        res.status(200).json(response);

    }catch(err){
        console. log(err) ;
        res.status (500).json({error: 'Internal Server Error'});
    }    
}) 

router.delete('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const responce = await person.findByIdAndDelete(personId);

        if (!responce){
            return res.status(404).json({ error: 'Person not found' }) ;
        }

        console. log ('data deleted'); 
        res.status(200).json({message: 'responce deleted successfully'});

    }catch(err){
        console. log(err) ;
        res.status (500).json({error: 'Internal Server Error'});
    }    
})

module.exports = router;