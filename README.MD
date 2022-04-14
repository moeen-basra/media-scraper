# Media Scraper

## How to Start Server

1. Clone Repo
2. Run docker-compose up
3. Use the following apis to scrap and list the media
4. go to client folder and run `npm i && npm start`

The client will run on 3000 and api will run on 8081

## APIs

### Scrape the Media

```
curl --location --request POST 'localhost:8081/media/scrape' \
--header 'Authorization: Basic bW9lZW46YmFzcmE=' \
--header 'Content-Type: application/json' \
--data-raw '{
    "urls": [
        "https://www.google.com/search?q=background+sexy&sxsrf=APq-WBtU1UAA3ZMBwbxcNR9tLcNMyx0C2Q:1649545810158&source=lnms&tbm=isch&sa=X&ved=2ahUKEwihmLiAjYj3AhV_gP0HHbSLC2cQ_AUoAXoECAEQAw&biw=1792&bih=931&dpr=1'\''"
    ]
}'
```

### Get the media list

```
curl --location --request GET 'localhost:8081/media?pageSize=10&page=1' \
--header 'Authorization: Basic bW9lZW46YmFzcmE='
```

## TODO:
- [x] Create an API which will accept an array for Web URL in the request Body.
- [x] Add Basic Server Auth Middleware.
- [x] Add Middleware for Logging and Error Handling.
- [x] Scrap Image and Video URLs for requested Web URL's.
- [x] Store All Data into any SQL database.
- [x] Create a simple web page for showing all the Images and Video's.
- [x] Paginate front-end API and we can filter data based upon type and search text.
- [x] Use Node.js for backend and React.js for front-end.
- [x] Dockerize your code using docker-compose or any docker orchestrator that can be run on personal computers.
- [x] Support both server side rendering and client side rendering (React, Angular..) scraper.
- [x] Do have the demo video of the working delivered submission included.

