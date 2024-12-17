require("dotenv").config();

const mongoose = require("mongoose");

const mongoDbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((response) => console.log("Veri tabanı bağantısı başarılı"))
    .catch((err) => console.log(err));
};

module.exports = mongoDbConnection;
