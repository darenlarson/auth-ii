require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(cors());
server.use(helmet());
server.use(express.json());


// routes
server.post('/api/register', (req, res) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;

    db('users')
        .insert(userInfo)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '30m'
    };

    return jwt.sign(payload, secret, options);
};

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}`, token });
            } else {
                res.status(401).json({ message: 'You are not authorized. Please try logging again.' });
            };
        })
        .catch(err => res.status(500).json(err));
});

// Middleware function used in the /api/users route that verifies that a valid token was sent in the header before sending the users from the database.
function protected(req, res, next) {
    const token = req.headers.authorization; //grabs the token from the request header. This token was originally sent to the client from the .post /api/login

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no token provided' });
    };
};

server.get('/api/users', protected, (req, res) => {
    const department = req.decodedToken.department;

    db('users')
        .where('department', department)
        .select('id', 'username', 'department', 'password')
        .then(users => {
            res.json({ users, decodedToken: req.decodedToken });
        })
        .catch(err => res.send(err));
});

module.exports = server;