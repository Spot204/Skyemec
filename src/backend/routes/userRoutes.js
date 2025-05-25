const express = require('express');
const User = require('../model/User')

const router = express.Router();

router.post('users', async (rep, res)=>{
    const  user = new User(res.body);
    await user.save();
    res.json(user);
})