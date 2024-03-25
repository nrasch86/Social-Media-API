const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtsRoutes');

module.exports = { userRoutes, thoughtRoutes };
