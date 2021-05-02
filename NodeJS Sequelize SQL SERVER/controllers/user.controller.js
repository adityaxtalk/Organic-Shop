const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const register = (req, res) => {
    const name = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    User.findOne({ where: { email: email } })
        .then(result => {
            if (result) {
                res.status(500).send(['User is already registered']);
            } else {
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        User.create({ fullName: name, email: email, password: hashedPassword, role: role })
                        res.status(201).json({ success: 'sucess', message: 'User Registered Successfully' })
                    })
                    .catch(err => {
                        res.status(422).json({ error: error });
                    })
            }
        })
        .catch(err => {
            res.status(422).send(err);
        });
}

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                console.log(1)
                res.status(401).json({ message: 'Invalid email or password' })
            } else {
                bcrypt.compare(password, user.password)
                    .then(doMatch => {

                        if (doMatch) {
                            const token = jwt.sign({
                                email: user.email,

                                userId: user.id
                            }, process.env.JWT_KEY, {
                                expiresIn: '1h'
                            })
                            res.status(201).json({ success: 'success', result: 'Auth Successful', token: token, user: user })
                        } else {
                            console.log(3)
                            res.status(401).json({ result: 'Invalid email or password' })
                        }

                    })
                    .catch(err => {
                        res.status(500).json('Error occurred while handling the request.');

                    })
            }
        })
        .catch(err => {
            res.status(500).json('Error occurred while handling the request.');
        })
}

module.exports = {
    register: register,
    login: login
}