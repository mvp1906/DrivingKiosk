const Appointment = require('../models/appointment');

const User = require('../models/g2');

exports.createAppointment = async (req, res) => {
  try {

    const { date, times } = req.body;

    if (!times || times.length === 0) {
      req.flash('errors', 'Please select at least one time slot.');
      return res.redirect('/appointments');
    }

    for (let time of times) {
      const existingAppointment = await Appointment.findOne({ date, time });

      if (existingAppointment) {
        req.flash('errors', `Time slot ${time} for ${date} already exists.`);
        return res.redirect('/appointments');
      }

      const newAppointment = new Appointment({ date, time, isTimeSlotAvailable: true });
      await newAppointment.save();
    }

    res.redirect('/appointments');
  } catch (error) {
    console.error("Error creating appointment:", error);
    req.flash('errors', 'Error creating appointment.');
    res.redirect('/appointments');
  }
};

// exports.User = async (req, res) => {
//     try {
//       const { userId, date, time } = req.body;
  
//       const appointment = await Appointment.findOne({ date, time });
  
//       if (!appointment || !appointment.isTimeSlotAvailable) {
//         return res.status(400).send('Time slot not available.');
//       }
  
//       appointment.isTimeSlotAvailable = false;
//       await appointment.save();
  
//       const user = await User.findById(userId);
//       user.appointments.push(appointment._id);
//       await user.save();
  
//       res.redirect('/g2_test');
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };

exports.getAvailableTimeSlots = async (req, res) => {
    try {
      const { date } = req.query;
      const availableDates = await Appointment.distinct('date', { isTimeSlotAvailable: true });
  
      let availableSlots = [];
      if (date) {
        const appointments = await Appointment.find({ date, isTimeSlotAvailable: true });
        availableSlots = appointments.map(appointment => appointment.time);
      }
  
      res.render('g2_test', { availableSlots, availableDates, selectedDate: date || '' });
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      res.status(500).send('Internal Server Error');
    }
  };