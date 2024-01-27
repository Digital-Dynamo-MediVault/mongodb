const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT;
const uri = process.env.MONGO_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.once('open', () => {
    console.log("mongodb connected");
})


const patient = require('./routes/patient');
app.use('/patient', patient)
const doctor = require('./routes/doctor');
app.use('/doctor', doctor)



app.listen(port, () => {
    console.log("server running on port :-" + port);
});