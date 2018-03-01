# Partial Reimplementation of HelloFresh

Project based on React/Redux architeture, Webpack for the tooling.

## Try it out
1. Clone this project
```
git clone https://github.com/tddinh/hf-recipes-demo.git
```

2. Install all dependencies
```
npm install
```

3. Run the dev server
```
npm start
```

View in browser: [http://localhost:8000/](http://localhost:8000/)


## Routes

- `/login` - Authentication screen
- `/recipes` - List of recipes

##  Features
### User
- Login input fields validation
- Restrict access to authenticated routes
- Responsive and mobile first

### Dev
- React SPA
- React Router for routing
- Redux to control the state of the application
- Recipes ratings and favorite functionality
- Grid System
- Endpoints to request the recipe data
- Project full linted with eslint
- Webpack to control all the tooling

## Tooling

All the tooling is developed with Webpack, it will automate all the process of bundling and generate a static `index.html` with the bundle and styles injected.

It's configured to run a dev server with HMR and compile all the project.
