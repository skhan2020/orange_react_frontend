
## Orange overview

The example application "Orange" is a task management SPA (somewhat like trello) written in React and Javascript to help students create and accomplish every day task. It also allows them to create notes and video playlist to help keep their study materials all in one application.

It uses custom API for all requests, including authentication. 

You can view a live demo over at https://orangeplanner-32d6f.firebaseapp.com/landing

This codebase was created to demonstrate a fully fledged application built with React that interacts with an actual backend server including CRUD operations, authentication, routing and more. Greate effort have been made to make the application as optimized as possible using the React guidelines.

Please note that the application is still a  `Work in Progress`

## Libraries / Dependencies

- React (Lirary to build UI)
- antd design library
- SCSS / Styled Components for Styling React components
- React-player (to play videos inside the application)
- Draft.js (a Rich Text Editor for React)
- React-Router
- Redux ( for state managment )
- Immutable.js
- GraphQL 

### Building the project

Clone the source code to your machine.
Run `npm install` to install all dependecies
Run `npm start` to start and the run the application locally

The application makes API calls against an Express backend hosted at `https://cryptic-depths-54668.herokuapp.com/graphqlapi`

Code for the backend can be found at https://github.com/skhan2020/orange_express_backend (please follow instructions in the read me file for how to run the server locally. 

Do change the graphQL URL in https://github.com/skhan2020/orange_react_frontend/blob/master/src/services/todo.js to `http://localhost:4000/graphqlapi` for APIs to point to your local Epress server).

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button in navigator)
- CRU* users (sign up & login UI - no deleting required)
- CRUD Tasks, Notes and videos
- GET and edit notes using the Draft.js (Rich Text Editor Framework for React)
- Add or delete videos to your list.
- A built in Notification framework when a task to due
- All text retrieved from external file optimized for localization.
- Responsive design.

**The general page breakdown looks like this:**

- Sign in/Sign up pages (URL: /#/landing )
    - Uses JWT (store the token in redux state)
- Todo page (URL: /#/main/todo )
    - Clicking on the first top (+) icon opens a `create todo page` when you are in this page
    - (Working on a welcome page currently)
- Notes page to view / edit notes (URL: /#/main/notes )
    - Clicking on the first top (+) icon opens a `create notes page` when you are in this page
- Video page to view / delete videos (URL: /#/main/videos )
    - Clicking on the first top (+) icon opens a `create video page` when you are in this page
- Charts page (Not yet implemented )


<br />

My Profile: `https://www.linkedin.com/in/samina-khan-161aa511/`
