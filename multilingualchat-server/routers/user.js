const express = require('express');
const router = express.Router();
const User = require('./../models/User');

router.post('/', async (req,res) => {
    const { clerkId } = req.body;

    if(!clerkId){
        throw new Error('clerkId is required');
    }

    const user = await User.findOne({
        clerkId
    });

    if(!user){
        throw new Error('User not found');
    }

    res.status(200).send({
        success : true,
        user
    });
});

router.post('/update',async (req,res)=>{

    const { name, age, bloodGroup, weight, height, specialisation, organisation } = req.body;

    if(!clerkId){
        throw new Error('clerkId is required');
    }

    const user = await User.findOne({
        clerkId
    });

    if(!user){
        throw new Error('User not found');
    }

    //update all fields that exist

    if(name){
        user.name = name;
    }
    if(age){
        user.age = age
    }
    if(bloodGroup){
        user.bloodGroup = bloodGroup;
    }
    if(weight){
        user.weight = weight;
    }
    if(height){
        user.height = height;
    }
    if(specialisation){
        user.specialisation = specialisation;
    }
    if(organisation){
        user.organisation = organisation;
    }
    await user.save();

    res.status(200).send({
        success : true,
        user
    });    
});

router.post('/create',async (req,res)=>{
    const { name, email, age, bloodGroup, gender, weight, height, specialisation, organisation, clerkId, role } = req.body;

    if( !name || !age || !gender || !bloodGroup || !clerkId || !role ){
        throw new Error('All these fields are required');
    }

    const user = new User({
        name,
        email,
        age,
        bloodGroup,
        clerkId,
        role
    });

    if(role==='doctor'){
        if(!specialisation || !organisation){
            throw new Error('Specialisation and organisation are required for doctors');
        }
        user.specialisation = specialisation;
        user.organisation = organisation;
    }

    if(role==='patient'){
        if(!weight || !height){
            throw new Error('Weight and height are required for patients');
        }
        user.weight = weight;
        user.height = height;
    }

    const newUser = await user.save();

    res.status(200).send({
        success : true,
        user : newUser
    });
});

module.exports = router;