const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')

const JWT_SECRET = "HiThisW!ed!note"

// This is end point is used to create the user no login required
// /api/auth/createuser

router.post('/createuser', [
    // Give the validation condtions to the resquest
    body('name', 'Enter the valid name').isLength({ min: 3 }),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Enter the password of at least 5 length').isLength({ min: 5 })
], async (req, res) => {
    // Handling the error if any entery against the validation condition
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // To check the duplicate records
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({success, error: "This is email is already exsist" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    try {
        // check the response make using the mongodb if there is any by the database also deal in the catch statement
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const tokenAuth = jwt.sign(data, JWT_SECRET)
        res.json({success, tokenAuth });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// This endpoint is used  for the authtification of the user login enteries

router.post('/login', [
    // Give the validation conditions to the request
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Enter the valid password').exists()
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Enter valid credentials, please" });
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(400).json({success, error: "Enter valid credentials, please" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        success = true;
        const tokenAuth = jwt.sign(data, JWT_SECRET);
        res.send({success, tokenAuth  });
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ error: "There is an internal server error" });
    }
});



// This the end point to fetch the user /getuser

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        return res.status(500).json({ error: "There is internal server error" })
    }

})


module.exports = router;
