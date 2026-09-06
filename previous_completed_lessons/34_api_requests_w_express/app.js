const express = require("express");
const fs = require("fs");

const users = JSON.parse(
    fs.readFileSync("./users_data.json"));

const app = express();


app.get("/api/users", (_, res) => {
    res
        .status(200)
        .json({
            status: "seccess",
            count: users?.length ?? 0,
            data: {
                users: users
            }
        });
});

app.get("/api/users/{id}", (req, res) => {
    console.log("Request:", req.url?.toLowerCase() ?? "");

    const user =
        users?.find(u => u.id === id);

    if (user === null || user === undefined) {
        res.status(404).end();
        return;
    }

    res.status(200).json(user);
});

app.post("/api/users", (req, res) => {
    console.log("Request:", req.url?.toLowerCase() ?? "");

    res.end();
});

const port = 3000;
app.listen(port, () => {
    console.log("Server w/ Express Started.");
});
