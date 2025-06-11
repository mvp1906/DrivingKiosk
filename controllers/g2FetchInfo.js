const g2 = require('../models/g2')

module.exports=async(req,res) => {
    try{
        const {licenseNo} = req.body;
        const fetchInfo = await g2.findOne({
            licenseNo: licenseNo
        })
        console.log(fetchInfo)
        res.render('g',{fetchInfo})
    }
    catch (error){
        console.log(error);
        res.render('g')
    }
}