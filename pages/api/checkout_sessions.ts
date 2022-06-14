//bring in stripe
import { NextApiResponse, NextApiRequest } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // create checkout session from body params
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1LAhWNIXq2gymChcXttU9n8O",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?cancel=true`,
      });
      res.redirect(303, session.url);
    } catch (e) {
      console.error(e); //this should be a logger
      res.status(500).send({ success: false });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
