const g2 = require('../models/g2')

module.exports = async(req,res) => {
    try{
        const fetchInfo = await g2.findByIdAndUpdate(
            req.session.userId
        ,
        {
            "car_details.model":req.body.model,
            "car_details.year":req.body.year,
            "car_details.platno":req.body.platno
        },
        {
            new:true
        }
    )
        console.log(fetchInfo)
        res.render('g',{fetchInfo})
    }
    catch (error){
        console.log(error);
        res.render('g')
    }
}