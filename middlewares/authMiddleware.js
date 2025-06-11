const users=require('../models/g2')

module.exports = async(req,res,next) =>{
    try{
        const user = await users.findById(req.session.userId);
        if(!user || req.session.userType!='driver'){
            return res.redirect("/")
        }
        next()
    }
    catch(error){
        console.log(error)
        res.status(500).send('An error occured while checking the user session')
    }
}