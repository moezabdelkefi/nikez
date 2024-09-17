const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51NFb0NHo0XtniAaJZVKSIz7SMIy2rfPIjwrcoKC1y2KCtZz5T1CaUJMNmrfFJOZvttsYPdmojR9qdkZ1hWy0HEF400bTRypBGZ');
const app = express();

app.use(express.json());
app.use(cors());

// Create a payment intent
app.post('/api/server', async (req, res) => {
    try {
        const { line_items } = req.body;

        if (!line_items || line_items.length === 0) {
            return res.status(400).json({ error: 'Missing line items in the request.' });
        }

        const params = {
            payment_method_types: ['card'],
            line_items: line_items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the payment intent.' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});