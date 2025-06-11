const appointmentModel= require("../models/appointments");
const ejs = require("ejs");
const path = require("path");


 module.exports=async(req,res)=>{

    console.log(req.body)

    await appointmentModel.create({
        apptDate:req.body.apptDate,
        apptTime:req.body.apptTime
    });
    
    // await appointmentModel.create(req.body);
     res.redirect("/appointments");
}