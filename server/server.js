const cors = require('cors')
const express = require('express')
const stripe = require('stripe')("sk_test_51HdRXyKj89cMUyZWwDyawc9X1L1qd0Be6yjqGb6qg393mbEUyQ1b1RXOCOxZKOFiNc5Elxpj2IMw6TqUblqeRfq500wQTTfDwm")

const app = express()
app.use(express.json())
app.use(cors())

app.post('/checkout', async (req, res) => {
    console.log(req.body)
    var status = ""

    const { product, token } = req.body

    // Create Customer
    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    })

    try {

        // Charge
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'purchase',
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, { idempotencyKey: 432534 })

        status = "success"
        console.log(charge)

    }
    catch (error) {
        console.log(error)
        status = "failure"
    }

    res.json({ status })
})

app.post('/inline-checkout', async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 995,
        currency: "usd"
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
})

app.listen(8080)