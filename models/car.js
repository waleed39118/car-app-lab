const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const carSchema = new mongoose.Schema({
  make: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1886, max: currentYear },
  color: { type: String, trim: true },
  mileage: { type: Number, min: 0 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true },
  image: { type: String, trim: true } 
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
