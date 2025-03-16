const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;


app.use(express.static("public"));
app.use("/.well-known", express.static(path.join(__dirname, "public", ".well-known")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http:://localhost:${PORT}`);
});
