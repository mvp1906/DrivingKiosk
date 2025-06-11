const Usermodel= require("../models/g2");
const Appointment= require("../models/appointment");
const ejs = require("ejs");
const path = require("path");


 module.exports=async (req, res) => {
  try {
    const { date, time } = req.body;

    // Find and update the appointment
    const appointment = await Appointment.findOne({ date, time, isTimeSlotAvailable: true });
    if (appointment) {
      appointment.isTimeSlotAvailable = false;
      await appointment.save();

      // Assuming the user is logged in and req.session.userId is set
      const user = await Usermodel.findById(req.session.userId);
      user.appointments.push(appointment._id);
      await user.save();

      res.redirect('/g2_test');
    } else {
      res.status(400).send('Time slot not available.');
    }
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).send('Internal Server Error');
  }
};
   
  //res.render('g2');
  
