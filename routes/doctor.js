const router = require('express').Router();

let nodemailer = require('nodemailer')
require('dotenv').config();

const UserAccount = require('../models/doctor.modal');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'realmadrid83527@gmail.com',
        pass: 'vfcxgfbeddekykaz'
    }
});
router.post('/adddoctor', async (req, res) => {
    try {
        const { name, age, gender, email, exprience, specialization, phone } = req.body;
        const generatePatientId = () => {

            const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
            const patientId = `${randomNumber}`;
            return patientId;
        };
        // Create a new user
        const newUser = new UserAccount({
            dId: generatePatientId(),
            name,
            age,
            gender,
            email,
            exprience,
            specialization,
            phone
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send email to the user
        const mailOptions = {
            from: 'sanskargupta0901@gmail.com', // Replace with your Gmail email address
            to: savedUser.email,
            subject: 'Welcome to Our MediVault',
            text: `Thank you for registering with us! Click the following link to activate your account: https://medivault-web.vercel.app/activate?email=${savedUser.email}&role=doctor`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: 'Error sending email' });
            } else {
                res.status(200).json({ message: 'User added successfully and email sent' });
            }
        });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});
router.post('/activate', async (req, res) => {
    const { password, metamaskAddress, email } = req.body;
    try {
        const user = await UserAccount.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = password;
        user.metamaskAddress = metamaskAddress;
        await user.save();
        res.status(200).json({ message: 'User activated successfully', user: user });
    }
    catch (error) {
        console.error('Error activating user:', error);
        res.status(500).json({ message: 'Error activating user' });
    }
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserAccount.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
})


module.exports = router;