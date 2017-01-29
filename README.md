# Socialis - Node.js Social Share

I use this microservice to maintain my social media.

The application takes a list of RSS/ATOM feeds, provided as an array in the /modules/feeds.js module, picks a random article and posts it to my Facebook page and Twitter account. The specified cron job will run this code every 2 hours.

If you wish to use this application for yourself:

* Clone the repo
* Navigate to the cloned direcotry and run `npm install`
* Supply an array of RSS/ATOM URLs in the /modules/feeds.js file.
* Create a .env file in the root directory and fill in your personal details (see .env.example file)
