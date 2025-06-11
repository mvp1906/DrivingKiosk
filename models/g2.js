const mongoose = require('mongoose');
const Appointment = require('./appointment');
const Schema = mongoose.Schema;

const g2Schema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true 
    },

    password:{
        type: String,
        required: true,
    },

    userType:{
        type: String,
        enum: ['Driver', 'Examiner', 'Admin'],
        required: true,
    },
    
  firstname: {
    type: String,
  default: "default"
},

  lastname: {
    type: String,
  default: "default"
  
},

  LicenseNo: {
    type: String,
    default: "default",
  },

  Age: {
    type: Number,
  default: 0
},

  cardetails: {
    make: {
        type: String,
    default: "default"
},

    model: {
        type: String,
    default: "default"
},

    year: {
        type: Number,
    default: 0
},

    platno: {
        type: String,
    default: "default"
},
},
appointments: [{
  date: Date,
  time: String,
  type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
}]
})

const g2 = mongoose.model('g2', g2Schema);
module.exports = g2;