const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
});

const cars = mongoose.model('cars', CarSchema);
module.exports = cars
