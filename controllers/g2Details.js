const g2 = require('../models/g2')
const bcrypt = require('bcrypt')
const session=require('express-session')

module.exports = async(req,res) => {
    try{
        const existingRecord = await g2.findOne({ licenseNo: req.body.licenseNo });
        if (existingRecord) {
            return res.render('g2', { error: 'License Number already exists. Please enter a unique License Number.' });
        }
        console.log(req.body);
        const g2Details = await g2.findByIdAndUpdate(req.session.userId,{
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            licenseNo: req.body.licenseNo,
            age: req.body.age,
            "car_details.make":req.body.make,
            "car_details.model":req.body.model,
            "car_details.year":req.body.year,
            "car_details.platno":req.body.platno
    });
        console.log(g2Details)
        res.redirect('/')
    }
    catch (error){
        console.log(error)
    }
}