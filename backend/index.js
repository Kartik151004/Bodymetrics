const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connection = require("./src/db/Connection");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
connection();

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("BMI App");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}`);
});
