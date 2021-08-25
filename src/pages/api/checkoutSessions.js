const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//import { loadStripe } from "@stripe/stripe-js";
//const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      console.log("request body ", req.body);
      const session = await stripe.checkout.sessions.create({
        //line_items: req.body,
        line_items: [{ price: "price_1JQVjeBn6ujpoUXKNmDd1v3y", quantity: 2 }],
        //shipping_rates: ["shr_1JS0MIBn6ujpoUXKEDHuEEkk"],
        /*
        shipping_address_collection: {
          allowed_countries: ["GB"],
        },
        */
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      //res.setHeader("Access-Control-Allow-Origin", "https://3000-coral-ptarmigan-jhczgp8y.ws-eu16.gitpod.io"); // update to match the domain you will make the request from
      //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      console.log('session: ', session)
      
      //res.redirect(303, session.url);
      res.status(200).json(session)
    } catch (err) {
      console.log('error res: ', res)
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
