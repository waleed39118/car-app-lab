const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

const Car = require('./models/car');

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Config EJS
app.set('view engine', 'ejs');

// Connect to MongoDB
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

// Display all cars
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.render('index', { cars });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Show new car form
app.get('/cars/new', (req, res) => {
  res.render('new');
});

// Create a new car
app.post('/cars', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.redirect('/cars');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating car');
  }
});

// Show specific car
app.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.render('show', { car });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Show edit form
app.get('/cars/:id/edit', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.render('edit', { car });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a car
app.put('/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/cars/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating car');
  }
});

// Delete a car
app.delete('/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting car');
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
