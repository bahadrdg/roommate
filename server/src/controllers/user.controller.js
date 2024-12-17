const Users = require("../models/user.model"); // Model dosya yolunuza göre düzenleyin
const APIError = require("../utils/Error")

// 1. Create a New User
const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password, phone, address, image } = req.body;

        // Eksik alan kontrolü
        if (!name || !lastname || !email || !password || !phone ) {
            throw new APIError('Tüm alanlar zorunludur!', 400);
        }

        // E-posta kontrolü
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            throw new APIError('Bu e-posta adresi zaten kullanımda!', 400);
        }

        // Yeni kullanıcı oluştur
        const newUser = new Users({
            name,
            lastname,
            email,
            password,
            phone,
            address,
            image
        });

        // Veritabanına kaydet
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        if (error instanceof APIError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            throw new APIError('Kayıt gerçekleştirilemedi!', 500);
        }
    }
};


// 2. Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        throw new APIError('Kullanıcılar getirilemedi!', 500);
    }
};

// 3. Get a User by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// 4. Update a User
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Kullanıcıyı güncelle
        const updatedUser = await Users.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error: error.message });
    }
};

// 5. Delete a User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Kullanıcıyı sil
        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

// 6. Toggle User Status (Aktif/Pasif)
const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = !user.status; // Durumu tersine çevir
        await user.save();

        res.status(200).json({ message: "User status updated", status: user.status });
    } catch (error) {
        res.status(500).json({ message: "Error toggling user status", error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleUserStatus
};
