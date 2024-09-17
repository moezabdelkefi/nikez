const express = require('express');
const stripe = require('stripe')('sk_test_51NFb0NHo0XtniAaJZVKSIz7SMIy2rfPIjwrcoKC1y2KCtZz5T1CaUJMNmrfFJOZvttsYPdmojR9qdkZ1hWy0HEF400bTRypBGZ'); // Your secret API key
const app = express();

// Serve the static files
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Endpoint to create a checkout session
app.post('/api/stripe', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: '{{PRICE_ID}}', // Replace with the actual price ID
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success', // Replace with your success URL
    cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL
  });

  res.json({ id: session.id });
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
