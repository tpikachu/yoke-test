# Backend

## Prerequirements
 - set the mongodb uri on .env.development or .env
 - you are free to change the dummy products or dummy users on the src/lib/dbFeeder.js

## How to run
 - `yarn`
 - `yarn dev` or `yarn start`

## Availiable endpoints
 - POST: /api/login
 - GET: /api/user
 - POST: /api/purchase
 - GET: /api/products
 - GET: /api/receipts

NOTE:  Backend will check if mongo collections were exist if not it will init the db with dummy data (users and products)

# Frontend

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Prerequirements
 - set the backend endpoint here in /src/utils/constants.tsx

## Available Scripts

In the project directory, you can run:

### `npm install`

and

### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### Test email
test@gmail.com