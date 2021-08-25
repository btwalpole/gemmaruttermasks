const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      console.log("request body ", req.body);
      const session = await stripe.checkout.sessions.create({
        line_items: JSON.parse(req.body),
        //line_items: [{ price: "price_1JQVjeBn6ujpoUXKNmDd1v3y", quantity: 2 }],
        shipping_rates: ["shr_1JS0MIBn6ujpoUXKEDHuEEkk"],
        shipping_address_collection: {
          allowed_countries: ["GB"],
        },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      console.log('session: ', session)      
      res.status(200).json(session)
    } catch (err) {
      console.log('errored')
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
