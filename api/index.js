const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config()


const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(cors())


mongoose.connect(process.env.MONGOURL).then(() => console.log('Database Connected')).catch((err => console.log(err)))

app.listen(process.env.PORT, () => console.log("App running"))
