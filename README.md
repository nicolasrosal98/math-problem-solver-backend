# Photo math problem solver (back-end)

This repo sets up the backend for a photo math problem solver. The project uses tensorflow.js to create a CNN capable of recognising digits and mathematical symbols (+, -, and x) in an image provided by the user. An endpoint allows for users to upload a picture and get a prediction of the symbols and digits. 

[Heroku Server](https://math-problem-solver-backend.herokuapp.com/) (Use /pastes path to get data from database)

[Front-end Repo](https://github.com/nicolasrosal98/math-problem-solver-frontend)

## Install

`yarn`

## DB Setup

Copy .env.example to .env and set `DATABASE_URL` and `PORT` to your liking.

Example for a local database: `DATABASE_URL=postgres://neill@localhost/pastebin`

You will need to create your own databases for this project - one locally and one on Heroku.

## Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL (appropriate for your local db)

## running on heroku

When the project is deployed to heroku, the command in your `Procfile` file will be run.
