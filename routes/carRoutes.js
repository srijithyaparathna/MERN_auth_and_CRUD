const express = require('express');
const router = express.Router();


const {CreateCar , GetCars , GetCarById, UpdateCar,DeleteCar} = require('../controllers/carController.js');

const {authMiddleware,adminMiddleware} = require('../midelwares/auth.js')


// Public Routes
router.get('/', GetCars);
router.get('/:id',GetCarById);


//Protected Routes
router.use(authMiddleware);
router.post('/',adminMiddleware,CreateCar);
router.post('/:id',adminMiddleware,UpdateCar);
router.post('/:id',adminMiddleware,DeleteCar);

module.exports = router;

