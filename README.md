# Onovolab Junior Front-End Developer Challenge

This is my submission to Onovolab's (an innovative ecosystem and coworking space) Junior Front End challenge.
It's basically an React WebApp that let's a user rate (1 to 5 stars) StartUps that presented their purposes and products in the Startup Fest event.
The ratings are stored at a Cloud Firestore database and summarized at the Results page. Locally, the ratings are stored in the sessionStorage, so multiple users can vote in the same device.

TODO:
    Test the whole app using using react-testing-library and jest-dom

## React

* react@16.6.3,
* react-dom@16.6.3,
* react-relay@1.7.0,
* react-router-dom@4.3.1,
* react-scripts@2.1.1,
* react-testing-library@5.2.3

## External Libraries Used

* @material-ui/core@3.2.2
* @material-ui/icons@3.0.1
* react-rating@1.4.1
* font-awesome@4.7.0
* react-debounce-input@3.2.0
* firebase@5.5.8
* jest-dom@2.1.1
* lodash@4.17.11

## Setup

To get started

* install all project dependencies with `npm install`
* start the development server with `npm start` or `yarn start`
```