# README.md

## MICROSERVICES:

1. React App --> `client`
2. Express for Posts --> `posts`
3. Express for Comments --> `comments`


### CLIENT -- a Create React App

1. Make a CRA
2. Delete everything in `src`
3. Add `index.js`
4. Add `App.js`

### POSTS -- an Express Server

1. Make folder
2. `npm init`
3. Build out `index.js`

### COMMENTS -- an Express Server

1. Make folder
2. `npm init`
3. Build out `index.js`

--------------


### `client/src/index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

### `client/src/App.js`

```javascript
import React from "react";

export default () => {
  return <div> Blog App! </div>;
};
```

### `posts/index.js`

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  console.log("getting here", id, title);

  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("currently listening on port 4000");
});

```

### `comments/index.js`

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const content = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("currently listening on port 4001");
});
```