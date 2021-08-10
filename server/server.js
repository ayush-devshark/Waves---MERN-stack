const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanititize = require('express-mongo-sanitize');

// sanitize
app.use(xss());
app.use(mongoSanititize());

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
