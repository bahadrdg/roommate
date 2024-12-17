const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./src/middlewares/lib/cors')

const app = express();
const mongoDbConnection = require("./src/config/mongodb.connection.js");
mongoDbConnection();

app.use(cors(corsOptions))

app.use(bodyParser.json());

dotenv.config();
app.use(express.json()); // JSON veri okumak için
app.use(cookieParser()); // Cookie'leri okuma yeteneği

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const routes = require('./src/routes/index.routes')
app.use(`/api`, routes)


app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
