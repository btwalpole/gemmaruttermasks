# <img width="40" src="https://github.com/btwalpole/gemmaruttermasks/blob/dev/public/images/logo.png?raw=true" alt="mask logo" /> Gemma Rutter Masks - A Next.js + Stripe Online Store 

**Live at :point_right: https://gemmarutter.com**

## Overview
During the pandemic, my girlfriend started making hand made masks and scrunchies to sell to friends. I decided this was the perfect opportunity for my first major web project! I could provide her a platform for her products as well as improving my front end dev skills.

The website provides a hompage, individual product pages and a modal for the shopping cart - this is all written in [Next.JS](https://nextjs.org/), bootstrapped with `create-next-app`.
 
I wrote a short Next.JS API route to call the Stripe API which handles payments. 

## Tech Stack

<p align="left">
  <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
    <img height="50" src="./public/nextjs-logotype-light.svg?raw=true" alt="Next.JS Logo" />
  </a>
  <a href="https://www.stripe.com" target="_blank" rel="noopener noreferrer">
    <img width="100" src="./public/stripe.svg?raw=true" alt="stripe logo" />
  </a>
  <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
    <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
  </a>
</p>


I chose Next.JS for the front end to utilise it's pre-rendering of HTML for performance, and for it's improved SEO over a plain react app. 

I chose Stripe to handle payments as it's o widely used and well documented. It's not as easy to work with as for example, Snipcart, but it's significantly cheaper for a small store. Snipcart also takes care of all the cart logic for you and for the purposes of improving my React skills I wanted to write this aspect myself.

Stripe also does automated email receipts for customers and notifies me of a purchase.

I deployed to Netlify as it seems to be a popular service for JAMStack apps.

## Challenges Faced & Lessons Learned

* Cart Logic - use the React Context API
* Stripe integration - made a NextJS API route with an async function. 
* Management of products in json file. Had to rethink the structure of the objects in there to best account for each product having multiple lining styles.
* Global styles - learned to use css variables

## How to Install Your Project & Use it ??

## Future Features

* Add testing - in particular for the cart functionality and for the integration Stripe.
* Use a CMS to manage products, e.g. Strapi, WP with WPGraphQL
* Authentication & Login to save favourites and see past orders
* Set up a CI/CD pipeline with Docker and Travis CI or similar.
* Improve accessibility
* Save the cart contents to localStorage.
* Optimise SEO
* Use more advanced parts of the Stripe API, e.g. Payment Intents with Webhooks
* Make use of https://useshoppingcart.com/ to simplify the Stripe integratino
* Add a dark mode. Some excellent ideas here for Gatsby which should be applicable to Next.JS https://www.joshwcomeau.com/react/dark-mode/