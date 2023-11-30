const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const cors = require('cors')
require('dotenv').config()


const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(cors())


mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected')).catch((err => console.log("Error Connecting To Mongose::" + err)))

app.listen(process.env.PORT, () => console.log("App running"))


const User = require('./models/user')
const Order = require('./models/order')

// send verify email

const sendVerificationEmail = async (email, verifyToken) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "agbokennethchidoziem@gmail.com",
            pass: "yudc aboo etzp zivq"
        }
    })
    // compose email message

    const mailOption = {
        from: 'amazon.com',
        to: email,
        subject: "Email Verification",
        text: `Please click on the following link to verify your Email: http://192.168.43.110:8000/verify/${verifyToken}`
    }

    try {

        await transporter.sendMail(mailOption)

    } catch (error) {
        console.log("Error Sending Verification Email::", error);
    }
}

// Register user

app.post('/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // Existing user
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(400).json({ message: "Email Already Exist" })
        }

        // Create new user
        const newUser = new User({ name, email, password, verificationToken: crypto.randomBytes(20).toString('hex') });

        const randomToken = newUser?.verificationToken
        const createdUser = await newUser.save()

        res.status(201).json(createdUser)

        // send verification email to User
        sendVerificationEmail(newUser?.email, randomToken)

    } catch (error) {
        console.log("Error Registering User", error);
        res.status(500).json({ message: "Registration Failed" })
    }
})

// verify email

app.get("/verify/:token", async (req, res) => {

    try {
        const token = req.params.token

        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            return res.status(404).json({ message: "Invalid Verification Token" })
        }

        user.verified = true;
        user.verificationToken = undefined;

        await user.save()
        res.status(200).json({ message: "Email Verified Successfully" })

    } catch (error) {
        return res.status(404).json({ message: "Email Verification Failed" })
    }
})

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString("hex")
}

const secretKey = generateSecretKey()

// login credentials

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user Already exist
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token, user })

    } catch (error) {
        return res.status(500).json({ message: "Login Failed" })
    }
})

// Endpoint to store new address to the backend

app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        // find user by id
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not Fount" })
        }

        user.addresses.push(address)
        await user.save()

        res.status(200).json({ message: 'Address Created Successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Error Adding Address' })

    }


});

// Endpoint to get all user

app.get("/addresses/:userId", async (req, res) => {
    try {

        const userId = req.params.userId;
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not Fount" })
        }

        const address = user.addresses;
        res.status(200).json(address)

    } catch (error) {
        res.status(500).json({ message: 'Error Retrievinf Address' })

    }
})