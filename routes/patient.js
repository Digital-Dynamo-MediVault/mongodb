const router = require('express').Router();

let nodemailer = require('nodemailer')
require('dotenv').config();

const UserAccount = require('../models/patient.model');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'realmadrid83527@gmail.com',
        pass: 'vfcxgfbeddekykaz'
    }
});
router.post('/addpatient', async (req, res) => {
    try {
        const { name, age, gender, email, addressp, bloodGroup, guardian, guardianp, phone } = req.body;
        const generatePatientId = () => {

            const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
            const patientId = `${randomNumber}`;
            return patientId;
        };
        // Create a new user
        const newUser = new UserAccount({
            pId: generatePatientId(),
            name,
            age,
            gender,
            email,
            addressp,
            bloodGroup,
            guardian,
            guardianp,
            phone
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send email to the user
        const mailOptions = {
            from: 'your-email@gmail.com', // Replace with your Gmail email address
            to: savedUser.email,
            subject: 'Welcome to Our MediVault',
            text: `Thank you for registering with us! Click the following link to activate your account: https://medivault-web.vercel.app/activate?email=${savedUser.email}&role=patient`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                // console.log('Email sent:', info.response);
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
router.post('/addreport', async (req, res) => {
    try {
        const { pId, report } = req.body;
        const user = await UserAccount.findOne({ pId: pId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.report.push(report);
        await user.save();
        res.status(200).json({ message: 'Report added successfully', user: user });
    } catch (error) {
        console.error('Error adding report:', error);
        res.status(500).json({ message: 'Error adding report' });
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
router.get('/', async (req, res) => {
    try {
        const user = await UserAccount.find();
        res.status(200).json({ message: 'User Details', user: user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Errorgetting details' });
    }
})
module.exports = router;