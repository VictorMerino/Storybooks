# Storybooks [...WIP...]

App to save messages to be shown for other users.
Includes a dashboard, and add/edit/delete stories

## Enhancements:

- Check code for duplications
- Clean routes: organize code and move functions outside of the actual routes
- Error 404/500: better templates
- Add vs Edit templates: it is actually redundant, maybe they can be unified
- Session variables:
  - User (with this we will prevent some ugly things, like redundant calls to db, and isAuthenticated can be based on if this variable is empty or not)
  - FullName: calculated on startup
- Finish app.js organization: connectDB, morgan and flash config files
- CanEdit helper: outside of hbs helpers, as it is actually a Common Helper (not only for templates, but useful in routes as well)

## Next features:

- When user register: auto-login and redirect to /dashboard
- User stories view: AND/OR: Get all Public or FromLoggedUser and show them
- Visually different Private vs Public stories
- Try again with Google+ OAuth
- User area: to see User Profile and being able to edit it
- Modal "Are you sure?" before deleting a Story
- Typescript
- Automated tests
- Modals: try with new Modal from the Standard instead of using Materialize one
- Different roles/teams to access to routes/stories/etc
- Deploy to Heroku/Firebase/Netlify/Vercel/Whatever

## Technologies used:

- Node.js: Backend
- Express: Web Framework
- Passport: for authentication
- Handlebars for templates
- MongoDB
- Mongoose to communicate with Mongo
- Express Session and Connect Mongo for handle user session and store them in db
- Prettier basic config

## Really important:

```
You should provice your own environment variables:
PORT=3000 # 3000 is the standard one
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/YOUR_DB_NAME?retryWrites=true&w=majority
```

## Node.js version tested:

```
v16.14.2
```

## To run the project, just:

```
npm install && npm run dev
(this will run Nodemon (Node Server that reloads when you change any file))
```

### Or if you prefer it production-ready (NOT ACTUALLY TESTED, HANDLE WITH CARE):

```
npm run start
```
