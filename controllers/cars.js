const Car = require('../models/car');

const router = require('express').Router();


router.get("/Cars/new", async (req,res) => {
    res.render("Cars/new.ejs");
});
router.post("/cars", async (req, res) => {
    if(req.body.isReadyToBuy === "on"){
        req.body.isReadyToBuy = true;
    } else {
        req.body.isReadyToBuy = false;
    }
    await Car.create(req.body);
    res.redirect("/cars/new");
});

// Read All - index
router.get("/cars", async (req, res) => {
    const cars = await Car.find();
    res.render("cars/index.ejs", {cars});
});

//Read One -show
router.get("/cars/:carId", async (req, res) => {
    const car =await Car.findById(req.params.carId);
    res.render("cars/show.ejs", { car });
});

//edit - get
router.get("/cars/:carId/edit", async (req, res) =>{
    const car = await Car.findById(req.params.carId);
    res.render("cars/edit.ejs", { car })
});

// Update - PUT
router.put("/cars/:carId", async (req, res) => {
    if (req.body.isReadyToBuy === "on"){
        req.body.isReadyToBuy = true;
    }
    else {
        req.body.isReadyToBuy = false;
    }
    await Car.findByIdAndUpdate(req.params.carId, req.body);
    res.redirect(`/cars/${req.params.carId}`);
})


router.delete("/cars/:carId", async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId);
    res.redirect("/cars");
});
module.exports = router;