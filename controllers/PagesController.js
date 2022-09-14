const bcrypt = require('bcrypt');
const { request } = require('express');
require('../db/dbCon');
const User = require('../models/User');
const {hashIt} = require('../utils/passwordHash');


const indexPage = (req, res) => {
    const user = req.query.name || 'Dinabandhu';
   res.render('index',{
    title: 'Home Page',
    user
   })
}

const registerView = (req, res) => {
    res.render('register',{
        title: 'Register Page',
    })
}

const registerUser = (req, res) => {
    hashIt(req.body.password).then(pass =>{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: pass,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        })
        user.save().then(user => {
            // res.json({
            //     success: true,
            //     message: 'User created',
            //     userDetails: user
            // });
            res.redirect('/success');
        });
    });
}
const viewUsers = (req, res) => {
    User.find({}, (err, users) => {
        res.render('users',{
            title: 'Users',
            user: users
        })
    }).select('name email _id')
}

const editUser = (req, res) => {
    User.find({_id: req.params.id}, (err, user) => {
        res.render('user', {
            title: 'Edit User',
            user: user
        })   
    })
    
}

const successCreated = (req, res) => {
    res.render('success',{
        title: 'Successfully created user',
    })
}

const updateUser = (req, res) => {
    const userId = req.body.userId.trim();

    User.update({_id: userId}, {name: req.body.name, email: req.body.email}, {upsert: true}, (err, user) => {
        if (err) {  throw err; }
        // res.json({
        //     success: true,
        //     message: 'User updated',
        //     user: user
        // })
        res.redirect('/users')
    });
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const userIdcheck = await User.find({_id: userId}).select('_id');
    if(userIdcheck != ''){
        User.remove({_id: req.params.id}, (err, user) => {
            if (err) {  throw err; }
            res.redirect('/users')
        })
    }else{
        res.json({
            success: false,
            message: 'User not found',
            user: null
        })

    }
}



module.exports = {indexPage, registerView, registerUser, viewUsers, editUser, successCreated, updateUser, deleteUser}