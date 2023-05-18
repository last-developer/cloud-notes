const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSecret = "mp908090"
const fetchuser = require('../middlewares/fetchuser');

const { body, validationResult, ValidationChain } = require('express-validator');

// Validate user credentials by express-validator package
const validate = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    };
};


// Router 1: create a user using :post "/api/auth/createuser/"
router.post('/createuser', validate([
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
]), async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
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
        const authToken = jwt.sign(data, JWTSecret)
        // console.log(authToken);
        res.json({ authToken });
    } catch (err) {
        console.error(err.message);
    }
})

// Router 2: Authenticate a user using :post "/api/auth/login/"
router.post('/login', validate([
    body('email').isEmail(),
    body('password', 'Must be 5 characters long').isLength({ min: 5 }),
]), async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'Please login with valid credentials' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please login with valid credentials' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWTSecret)
        // console.log(authToken);
        res.json({ authToken });

    } catch (err) {
        console.error(err.message);
    }
})


// Router 3: Get loggedIn user details using :post "/api/auth/getuser/"
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
        
    } catch (error) {
        console.error(error.message);
    }
})



module.exports = router