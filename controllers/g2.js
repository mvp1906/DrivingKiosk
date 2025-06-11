const Appointment = require('../models/appointment');

module.exports = async (req, res) => {
  try {
    const { date } = req.query; // Get date from query parameters

    // If no date is provided, use the current date
    const queryDate = date || new Date().toISOString().split('T')[0];

    // Fetch available appointment slots for the selected date
    const availableSlots = await Appointment.find({ date: queryDate, isTimeSlotAvailable: true });

    // Map to get the time slots
    const timeSlots = availableSlots.map(slot => slot.time);

    // Fetch all time slots for the selected date to gray out already booked slots
    const allSlots = await Appointment.find({ date: queryDate });

    res.render('g2', { timeSlots, allSlots, selectedDate: queryDate });
  } catch (error) {
    console.error('Error fetching appointment slots:', error);
    res.status(500).send('Internal Server Error');
  }
};