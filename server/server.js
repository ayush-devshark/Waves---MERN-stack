const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanititize = require('express-mongo-sanitize');
const routes = require('./routes');

// MIDDLEWARE

// json
app.use(express.json());

// sanitize
app.use(xss());
app.use(mongoSanititize());

// routes
app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
