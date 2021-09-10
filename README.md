#Gemma Rutter Masks - A Next.js + Stripe Online Store# 

https://gemmarutter.com

![mask-logo](https://github.com/btwalpole/gemmaruttermasks/blob/main/public/images/logo.png?raw=true)

##Overview##

During the pandemic, my girlfriend started making hand made masks and scrunchies to sell to friends. I decided this was the perfect opportunity for my first major web project! I could provide her a platform for her products as well as improving my front end dev skills.

The website provides a hompage, individual product pages and a modal for the shopping cart - this is all written in [Next.JS](https://nextjs.org/), bootstrapped with `create-next-app`.
 
I wrote a short Next.JS API route to call the Stripe API which handles payments. 

##Tech Stack##

![stripe-logo](https://github.com/btwalpole/gemmaruttermasks/blob/main/public/stripe.png?raw=true)

I chose Next.JS to utilise it's pre-rendering of HTML for performance, and improved SEO over a plain react app. 

I chose Stripe as it's such a widely used payments API. It's not as easy to work with as for example, Snipcart, but it's significantly cheaper for a small store. Snipcart also takes care of all the cart logic for you, and for the purposes of improving my React skills I wanted to write this myself.

Stripe also takes care of automated email receipts for customers and to notify me of a purchase. It also has a nice dashboard to manage products.

I deployed to Netlify as it seems to be a popular service for JAMStack apps.


##Challenges Faced & Lessons Learned##

##How to Install Your Project & Use it ??##

##Future Features##

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