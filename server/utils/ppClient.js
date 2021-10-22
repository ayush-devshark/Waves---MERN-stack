const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
let enviornment = new paypal.core.SandboxEnvironment(clientId, clientSecret);

let client = new paypal.core.PayPalHttpClient(enviornment);

module.exports = { client };
