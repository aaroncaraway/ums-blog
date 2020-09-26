// -- QUERY
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = [];

app.get("/posts", (req, res) => {
  console.log("app get!");
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    console.log("QUERY -- Event Received: Post Created");
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    console.log("QUERY -- Event Received: Comment Created");
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    console.log("QUERY -- Event Received: Comment Updated");
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }

  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("currently listening on port 4002");
});
