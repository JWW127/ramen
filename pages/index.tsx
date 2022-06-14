import type { NextPage } from "next";
import Image from 'next/image'
import { useEffect } from "react";
import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";

//call loadstripe outside of component or it will recreate stripe object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHIBLE_KEY
);

export const Home: NextPage = () => {
  useEffect(() => {
    //check to see if there is a redirect coming from checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log(
        "Your order had been place! You will receive a email confirmation."
      );
    }
    if (query.get("canceled")) {
      console.log(
        "Your order has been canceled! Continue to shop around checkout when ready."
      );
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="NextJS Stripe App" content="My stripe template" />
      </Head>

      <main className="flex justify-center items-center flex-wrap ">
        <div className="flex justify-center flex-wrap rounded-lg items-center m-8 border-3 border-orange-200 shadow-xl shadow-orange-100">
          <Image src="/anime-tofu-ramen.jpg" alt="drawing of tofu ramen" height="320" width="320" className="rounded-t-md"/>
          <p className="basis-full my-1 w-0 text-center text-3xl font-mono text-gray-500"> Tofu Ramen</p>
        </div>
        <form action="/api/checkout_sessions" method="POST" className="basis-full text-center">
          <section>
            <button
              type="submit"
              role="link"
              className="border-2 p-2  font-mono text-xl text-white shadow-xl shadow-orange-100 rounded-md basis-full bg-orange-300  border-orange-100 hover:bg-orange-500 hover:text-white active:bg-orange-100 active:text-green-500"
            >
              Order
            </button>
          </section>
        </form>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;

