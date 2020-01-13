const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route           GET api/users
// @description     Test route
// @access          Public
router.get('/', (req, res) => res.send('Greetings, user'));

// @route           GET api/users
// @description     Register user
// @access          Public
// notes            postman headers key:content-type, value:application-json body:raw
router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

    const { name, email, password } = req.body;

    try {
        // see if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
        }
        
        // get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        
        user = new User({
            name,
            email,
            avatar,
            password
            })
            
            // encrypt password using bcrypt
            // more rounds = more secure
            // anything that returns a promise needs an await
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        
        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtToken'),
            { expiresIn: 360000 }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;
