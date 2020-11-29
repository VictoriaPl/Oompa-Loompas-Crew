# Oompa Loompa's Crew

Oompa Loompa's Crew it's a visualization tool with all the awesome workers of Willy Wonka. You can see information about them and search them by name or profession to know if any can be your new most eficient employee.

## How it works?

It uses the React library and it's popular new feature, React Hooks, with some methods as useContext and useReducer to manage a global state. It also saves in localStorage the information that has been fetch with the Oompa Loompa's API. It has an infinite scroll that is managed by the Intersection Observer API and some loading styles with react-loading-skeleton.

## Requirements

It is highly recommended to run the code in the last version of Chrome.

## How to start the project

Clone the repostory and in the project directory, you can run:

### 1. `yarn install`

### 2. `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Additional: `yarn test` 

Launches the test runner in the interactive watch mode.
It uses Jest and Enzyme to test the functional components.
