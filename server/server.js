const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanititize = require('express-mongo-sanitize');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

const { handleError, convertToAPIError } = require('./middleware/apiError');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('connected to monogo');
    })
    .catch(err => console.log(`No connection: ${err}`));

// MIDDLEWARE
// json parse
app.use(express.json());

// sanitize
app.use(xss());
app.use(mongoSanititize());

// passport - jwtAuth
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// routes
app.use('/api', routes);

// Error
//  For mongo, monogoose error
app.use(convertToAPIError);

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.use(express.static('client/build'));
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../client', 'build', 'index.html')
        );
    });
}

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
