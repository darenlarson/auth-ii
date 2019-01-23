require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());


// routes
server.get('/', (req, res) => {
    res.send('testing');
});

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

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}` });
            } else {
                res.status(401).json({ message: 'You are not authorized. Please try logging again.' });
            };
        })
        .catch(err => res.status(500).json(err));
});

server.get('/api/users', (req, res) => {
    db('users')
        .select('id', 'username', 'department')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = server;