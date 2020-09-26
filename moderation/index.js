// -- MODERATION
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  console.log("getting here moderation");
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    console.log("MODERATION -- Event Received: Comment Created");

    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.status(201).send(data);
});

app.listen(4003, () => {
  console.log("currently listening on port 4003");
});
