# Interview Scheduler

## The Project

This project is a single page application, designed to give an in depth example of how to build user interfaces using react, and other necessary dependencies. The app is an interviewer scheduler, which allows students to book interviews in a certain one hour time slot, monday through friday.  The student can input their name and select an interviewer for the appointment, and the appointment itself will be displayed with the student name and selected interviewer along with any other booked appointments for that day.  The data for this app is used by the API server from a PostgreSQL database, and uses axios to fetch the correct data.  The testing framework for this app is JEST, which allows for fully maxed out testing using a test driven development approach, ensuring correct code and a bug-free application.

## My experience

My experience creating this application was, for the most part, quite good. I very much liked the structure of react and how components are built and used to organize html, integrate user interface and help keep the code readable and organized.  The use of state, hooks, custom hooks, mode etc.. was something that I think makes react stand out from other frameworks that specialize in user experience. I really enjoyed my time on this project.

## Features

- a user can book an interview with a inputted name and selected interviewer
- a user can delete this interview at any time
- a confirm form is displayed to ensure the user would like to delete an interview
- a user can edit this interview at any time, and can change the name or interviewer
- a user can select any available slot, indicated by a "+" button
- a user can select the day for their interview by clicking the desired day on the left side bar

## Stack

- React
- Axios
- Classnames
- Storybook/addon-actions
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Getting started

[GitHub Repository](https://github.com/lighthouse-labs/scheduler-api)

1. Fork and clone the above repository
2. Follow the steps in the README.md file to create the database
3. From your terminal, navigate to the scheduler-api directory "cd scheduler-api"
4. start the server "npm start"
5. Fork and clone this repo
6. Navigate to this directory in you terminal
7. Run "npm start"