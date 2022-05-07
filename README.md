# Storybooks

App to save messages to be shown for other users.
Includes a dashboard, and add/edit/delete stories

Improvements:

- let user select between them.
- WIP... Lot of them

---

### Technologies used:

- Node.js: Backend
- Express: Web Framework
- Passport: for authentication
- Handlebars for templates
- MongoDB
- Mongoose to communicate with Mongo
- Express Session and Connect Mongo for handle user session and store them in db
- Prettier basic config

### Next steps:

- WIP

# Really important:

```
You should provice your own environment variables:
PORT=3000 # 3000 is the standard one
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/YOUR_DB_NAME?retryWrites=true&w=majority
```

---

---

### Node.js version tested:

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
