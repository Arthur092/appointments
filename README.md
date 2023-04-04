# Appointments

Welcome! In this project, we've created a form for a potential customer to create an appointment to see a healthcare provider. However—it doesn't completely work yet. That's where you come in! For this assignment, we'd like you to extend the existing functionality with the following enhancements:

1. We're currently failing to validate that the form data exists before the user can submit the form. Oops! Please make sure all fields have a value before the user can submit the form.
2. We're currently just sending hard-coded data to our API client upon form submission, rather than reading what the user has entered. Oops! Please wire up the form so that real form data is submitted.
3. Sometimes, APIs fail! Oops! Please make sure we show an error when the API fails.
4. We're currently failing to validate that the appointment time being requested doesn't overlap with other appointments. Oops! Please validate that the requested appointment time doesn't overlap with the existing ones. If it does overlap, we should show an error.
5. We're currently just showing a hard-coded existing appointment in the interface. Oops! Please fetch the current list of appointments from the API client when the page first renders.

This assignment is meant to assess whether you would be a good fit for working with our team. As such, we recommend approaching as if you were already on our team. Did we miss something in the product spec? Are we forgetting an edge-case? Feel free to write up anything you think we're forgetting and send it along with your completed project.

We expect this assignment to not take more than two hours. When you are finished coding please record a brief ~2-3 minute screen recording discussing your code changes at a high level. Include the video in a zip file with your code. We recommend using loom for the recording. Please use git and make occasional commits as you work (the git directory should be included in the zip). Feel free to Google things as needed, but for this assignment we ask that you don't use AI to write entire code blocks for you (Not the time to try out GTP-4).

## Repository Overview

Most of the user interface code for this application is currently in the `App.tsx` file. Feel free to refactor, clean up, or otherwise modify any code in this project **except for the `useAppointmentsApi` hook**.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and styled using CSS Modules. In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn more about React, check out the [React documentation](https://reactjs.org/).
