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

    const { clerkId, name, email, mobile, address, age, bloodGroup, weight, height, specialisation, organisation } = req.body;

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
    if(email){
        user.email = email;
    }
    if(mobile){
        user.mobile = mobile;
    }
    if(address){
        user.address = address;
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
    const { name, email, age, bloodGroup, weight, height, specialisation, organisation, clerkId, role } = req.body;

    if( !name || !age || !gender || !bloodGroup || !clerkId || !role ){
        throw new Error('All these fields are required');
    }

    const user = new User({
        name,
        email,
        age,
        bloodGroup,
        weight,
        height,
        specialisation,
        organisation,
        clerkId,
        role
    });

    const newUser = await user.save();

    res.status(200).send({
        success : true,
        user : newUser
    });
});

module.exports = router;