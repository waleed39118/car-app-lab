require('dotenv').config(); // Load environment variables for database connection

const express = require('express'); // Load Express
const mongoose = require('mongoose'); // Load Mongoose

const app = express();
const PORT = 3000;

// Define car schema
const carSchema = new mongoose.Schema({
  name: String,
  model: String,
  year: Number,
});

const Car = mongoose.model('Car', carSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // إضافة هذه السطر لمعالجة JSON
app.use(express.static('public'));

// Config EJS
app.set('view engine', 'ejs');

// Connect to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to the Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Add new car
app.get('/add-car', (req, res) => {
  res.render('add-car');
});

// Add new car to database
app.post('/add-car', (req, res) => {
  const newCar = new Car({
    name: req.body.name,
    model: req.body.model,
    year: req.body.year,
  });
  
  newCar.save()
    .then(() => res.redirect('/car-list'))
    .catch(err => {
      console.log(err);
      res.status(500).send('Error saving car');
    });
});

// Show car list
app.get('/car-list', (req, res) => {
  Car.find({}, (err, cars) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving cars');
    } else {
      res.render('car-list', { cars: cars });
    }
  });
});

// Start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});