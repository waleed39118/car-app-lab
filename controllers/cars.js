const Car = require('../models/car');
const router = require('express').Router();

// new car form
router.get("/cars/new", async (req, res) => {
  try {
    res.render("cars/new.ejs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while loading new car form.");
  }
});

// add new car
router.post("/cars", async (req, res) => {
  try {
    req.body.isReadyToBuy = req.body.isReadyToBuy === "on";
    const newCar = await Car.create(req.body);
    
    res.redirect(`/cars/${newCar._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating car.");
  }
});

// Read All - index
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.render("cars/index.ejs", { cars });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while loading cars.");
  }
});

// Read One -show
router.get("/cars/:carId", async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).send("Car not found.");
    }
    res.render("cars/show.ejs", { car });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while loading car details.");
  }
});

//edit - get
router.get("/cars/:carId/edit", async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).send("Car not found.");
    }
    res.render("cars/edit.ejs", { car });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while loading edit form.");
  }
});

// Update - PUT
router.put("/cars/:carId", async (req, res) => {
  try {
    req.body.isReadyToBuy = req.body.isReadyToBuy === "on";
    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).send("Car not found.");
    }
    res.redirect(`/cars/${updatedCar._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating car.");
  }
});

// Delete
router.delete("/cars/:carId", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.carId);
    if (!deletedCar) {
      return res.status(404).send("Car not found.");
    }
    res.redirect("/cars");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting car.");
  }
});

module.exports = router;
