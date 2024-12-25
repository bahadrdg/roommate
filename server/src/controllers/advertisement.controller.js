const Advertisement = require('../models/advertisement.model');
const APIError = require('../utils/Error'); // Hata yönetimi için kullandığınız APIError
const asyncHandler = require('express-async-handler');

// İlan oluştur
exports.createAdvertisement = asyncHandler(async (req, res) => {
    try {
        const { title, description, price, location, roomDetails, preferences, images } = req.body;

        const newAd = new Advertisement({
            title,
            description,
            price,
            location, // location bir dizi olmalı, eğer değilse uygun şekilde kontrol edilebilir
            roomDetails,
            preferences,
            images, 
            postedBy: req.user._id // İlanı oluşturan kullanıcıyı auth middleware ile alıyoruz
        });

        // Yeni ilan veritabanına kaydediliyor
        await newAd.save();

        // Başarı durumunda JSON yanıtı gönderiliyor
        res.status(201).json({
            message: 'Advertisement created successfully',
            advertisement: newAd,
            success: true
        });
    } catch (error) {
        console.error(error);

        // Hata türüne göre daha anlamlı hata mesajı döndürülüyor
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.errors });
        }

        // Genel hata durumunda
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Tüm ilanları listele
exports.getAllAdvertisements = async (req, res) => {
    try {
        const advertisements = await Advertisement.find().populate('postedBy', 'name email'); // İlan sahibinin ismini ve emailini getir
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Belirli bir ilanı getir
exports.getAdvertisementById = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await Advertisement.findById(id).populate('postedBy', 'name email');

        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        res.status(200).json(advertisement);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// İlan güncelle
exports.updateAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedAd = await Advertisement.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt: Date.now() },
            { new: true } // Güncellenmiş ilanı döndür
        );

        if (!updatedAd) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        res.status(200).json({ message: 'Advertisement updated successfully', advertisement: updatedAd });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// İlan sil
exports.deleteAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAd = await Advertisement.findByIdAndDelete(id);

        if (!deletedAd) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        res.status(200).json({ message: 'Advertisement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// İlanları filtrele ve ara
exports.filterAdvertisements = async (req, res) => {
    try {
        const { location, priceMin, priceMax, roomType, gender } = req.query;

        const query = {};
        if (location) query.location = { $regex: location, $options: 'i' }; // Konumda arama
        if (priceMin) query.price = { ...query.price, $gte: Number(priceMin) }; // Min fiyat
        if (priceMax) query.price = { ...query.price, $lte: Number(priceMax) }; // Max fiyat
        if (roomType) query['roomDetails.roomType'] = roomType; // Oda tipi
        if (gender) query['preferences.gender'] = gender; // Cinsiyet tercihi

        const advertisements = await Advertisement.find(query).populate('postedBy', 'name email');
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
