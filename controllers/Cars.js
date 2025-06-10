const Car = require('../models/car');

const router = require('express').Router();


router.get("/Cars/new", async (req,res) => {
    res.render("Cars/new.ejs");
});