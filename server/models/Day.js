const { Schema, model } = require('mongoose');

const HourSchema = new Schema({
  hour: {
      type: String,
      required: true
  },
  enabled: {
      type: Boolean,
      default: true
  }
});

const daySchema = new Schema({
  date: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  hours: {
    type: [HourSchema],
    required: true
  }
});

const Day = model('Day', daySchema);

module.exports = Day;
