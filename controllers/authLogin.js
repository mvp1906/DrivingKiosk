const g2 = require('../models/g2')
const bcrypt = require('bcrypt')

module.exports = async(req,res) => {
    try{
        console.log(req.body);
        const { username, password } = req.body
        const user = await g2.findOne({ username: username });
        req.session.userId=user._id
        req.session.userType=user.userType
        console.log(user)
        if(!user){
            return res.render('login', { error: 'Invalid username or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (isMatch) {
            return res.render('login', { error: 'Invalid username or password.' });
        }

        res.redirect('/')
    }
    catch(error){
        console.log(error);
        res.render('login', { error: 'An error occurred during login. Please try again.' });
    }
}