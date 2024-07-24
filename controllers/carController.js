const { message } = require('laravel-mix/src/Log'); // Import statement seems unnecessary. Commented it out for now.
// const { message } = require('laravel-mix/src/Log');
const Car = require('../models/Car'); // Corrected the case for the 'Car' model import

// Create a new car
const CreateCar = async (req, res) => {
    if (req.User.role !== 'admin') return res.status(403).send("Admin access required"); // Fixed the 'res.this.status(403)' and moved send to the next line

    try {
        const car = new Car(req.body); // Corrected 'new car(req, body)' to 'new Car(req.body)'
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get all cars
const GetCars = async (req, res) => {
    try {
        const cars = await Car.find(); // Corrected 'car.find()' to 'Car.find()'
        res.json(cars);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get a single car
const GetCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id); // Corrected 'car.findById' to 'Car.findById'
        if (!car) return res.status(404).send('Car not found'); // Corrected 'car not found' message
        res.json(car);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update a car (only admin)
const UpdateCar = async (req, res) => {
    if (req.User.role !== 'admin') return res.status(403).send("Admin access required");
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Corrected 'findByIdAdupdate' to 'findByIdAndUpdate'
        if (!car) return res.status(404).send("Car not found"); // Added missing semicolon
        res.json(car);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Delete a car (only admin)
const DeleteCar = async (req, res) => {
    if (req.User.role !== 'admin') return res.status(403).send("Admin access required");
    try {
        const car = await Car.findByIdAndDelete(req.params.id); // Added await and corrected 'findByIdAndDelete'
        if (!car) return res.status(404).send('Car not found');
        res.json({ message: "Car deleted successfully" }); // Corrected 'succefully' to 'successfully'
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    CreateCar,
    GetCars,
    GetCarById,
    UpdateCar,
    DeleteCar
};
