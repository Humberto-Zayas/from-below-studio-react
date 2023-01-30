const { Schema, model } = require('mongoose');

const daySchema = new Schema({
  date: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  hours: [String]
});

const Day = model('Day', daySchema);

module.exports = Day;
