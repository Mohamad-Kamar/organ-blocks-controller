const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();


app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Initial Response")
})

app.listen(port, () => {
  console.log("Server running on localhost:" + port);
});
