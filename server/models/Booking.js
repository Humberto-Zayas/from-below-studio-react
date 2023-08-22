const { Schema, model } = require('mongoose');

const BookingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  howDidYouHear: {
    type: String
  },
  date: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unconfirmed', 'confirmed', 'denied'],
    default: 'unconfirmed'
  }
});

const Booking = model('Booking', BookingSchema);

module.exports = Booking;
