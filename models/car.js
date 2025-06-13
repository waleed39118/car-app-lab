const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String },
    mileage: { type: Number },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }
});



const Car = mongoose.model('Car', carSchema);


module.exports = Car;

