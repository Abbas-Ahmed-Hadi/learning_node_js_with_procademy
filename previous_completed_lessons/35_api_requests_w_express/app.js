const express = require("express");
const fs = require("fs");
const fsp = require("fs/promises");


const usersData = (function() {
    try {
        return fs.readFileSync(
            "./users_data.json",
            "utf8");
    } catch (err) {
        console.error("An Error Occur:", err.message);
        return null;
    }
})();

const users = usersData ? JSON.parse(usersData) : [];

delete (usersData);

let latest_user_id = users[users?.length - 1]?.id ?? 0;

const app = express();

class User {
    constructor(id = 0, userName = "", password = "") {
        this.id = id;
        this.userName = userName;
        this.password = password;
    }
}


app.use(express.json());

app.get("/api/v1/users", (_, res) => {

    if (!users || users.length === 0) {
        res.status(404);

        res.end(JSON.stringify({
            status: "failed",
            error: {
                code: 404,
                message: "There is no users",
            }
        }));

        return;
    }

    res.status(200).json({
        status: "seccess",
        count: users?.length ?? 0,
        data: {
            users: users
        }
    });
});

app.post("/api/v1/users", async (req, res) => {
    if (!req.body) {
        res.status(400).end("Request Body Is Empty!");
        return;
    }

    const data = new User(
        latest_user_id + 1,
        req.body.userName,
        req.body.password);

    console.log("Data:", data);

    users.push(data);

    await fsp.writeFile(
        "./users_data.json",
        JSON.stringify(users));

    latest_user_id++;

    res.status(201).end("Created");
});

const port = 3000;
app.listen(port, () => {
    console.log("Server w/ Express Started.");
});

