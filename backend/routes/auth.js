const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

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
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // To check the duplicate records
    let user = await User.findOne({email : req.body.email})
    if(user) 
    {
        return res.status(400).json({error : "This is email is already exsist"})
    }
    // check the response make using the mongodb if there is any by the database also deal in the catch statement
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.json(user); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
