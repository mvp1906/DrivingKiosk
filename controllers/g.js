const g2=require('../models/g2')

module.exports = async(req,res) => {
    const user=await g2.findById(req.session.userId)
    console.log(user)
    res.render('g',{fetchInfo:user})
}