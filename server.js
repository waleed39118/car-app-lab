
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const Car = require('./models/car');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect to the database (MongoDB)
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



// Define car schema
const carSchema = new mongoose.Schema({
  name: String,
  model: String,
  year: Number,
});




// Config EJS
app.set('view engine', 'ejs');


// Display all cars
app.get('/cars', async (req, res) => {
    const cars = await Car.find();
    res.render('index', { cars });
});


// Show new car form
app.get('/cars/new', (req, res) => {
    res.render('new');
});

// Create a new car
app.post('/cars', async (req, res) => {
    const newCar = new Car(req.body);
    await newCar.save();
    res.redirect('/cars');
});

// Show specific car
app.get('/cars/:id', async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.render('show', { car });
});

// Show edit form
app.get('/cars/:id/edit', async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.render('edit', { car });
});

// Update a car
app.put('/cars/:id', async (req, res) => {
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/cars/${req.params.id}`);
});

// Delete a car
app.delete('/cars/:id', async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
});


// Start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});