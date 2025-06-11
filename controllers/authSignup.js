const g2 = require('../models/g2');
const bcrypt = require('bcrypt');

module.exports =async (req, res) => {
    const { username, password,repeatPassword,userType } = req.body;
    console.log(req.body)
    if(password!==repeatPassword){
        req.flash('errors',"Password did'nt match")
        return res.render('login')
    }
    try{
        const user=await g2.create({
            username:username,
            password:password,
            userType:userType
        })
        console.log(user)
        res.redirect('/')

    }
    catch(error){
        console.log(error)
        res.redirect('/')
    }
};
