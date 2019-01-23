require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(helment());
server.use(express.json());


// routes
server.get('/api/users', (req, res) => {

});

server.post('/api/register', (req, res) => {

});

server.post('/api/login', (req, res) => {

});

module.exports = server;