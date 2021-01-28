const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// @route    POST api/stripe/charge
// @desc     process a Stripe payment
// @access   Private
app.post("/stripe/charge", cors(), async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
    console.log('MY DATA', res.body);
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try{
        const payment = await stripe.paymentIntents.create({
            billing_details: {
                address: {
                    city: 'Cincinnati',
                    country: 'US',
                    line1: 'Short Vine St',
                    postal_code: "45219",
                    state: 'OH'
                },
                name: 'Dane Sebastian',
            },
            amount: amount,
            currency: "USD",
            description: "Test Company Payments",
            payment_method: id,
            confirm: true
        });
        console.log("stripe-route.js 19 | payment", payment);
        res.json({
            message: "Payment Successful",
            success: true
        });
    } catch (err) {
        console.log("stripe-routes.js 17 | error", err);
        res.json({
            message: "Payment Failed",
            success: false
        });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started...");
})