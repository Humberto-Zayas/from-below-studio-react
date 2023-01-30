const { Schema, model } = require('mongoose');

const availabilitySchema = new Schema({
  maxDate: {
    type: String,
    required: true
  }
});

const Availability = model('Availability', availabilitySchema);

module.exports = Availability;
