const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');

// CRUD işlemleri
router.post('/create',  advertisementController.createAdvertisement);
router.get('/', advertisementController.getAllAdvertisements);
router.get('/:id', advertisementController.getAdvertisementById);
router.put('/:id',  advertisementController.updateAdvertisement);
router.delete('/:id', advertisementController.deleteAdvertisement);

// Filtreleme
router.get('/filter', advertisementController.filterAdvertisements);

module.exports = router;
