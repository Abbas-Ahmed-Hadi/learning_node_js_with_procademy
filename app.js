const express = require("express");
const fsp = require("fs/promises");
const fs = require("fs");

class User {
    constructor(id = 0, userName = "", password = "") {
        this.id = id;
        this.userName = userName;
        this.password = password;
    }
}

const usersData = (function() {
    try {
        return fs.readFileSync(
            "./data/users.json",
            "utf8");
    } catch (err) {
        console.error("An Error Occur:", err.message);
        return null;
    }
})();

const users = usersData ? JSON.parse(usersData) : [];

delete (usersData);

const app = express();

app.use(express.json());

app.route("/api/v1/users")
    .get(getUsers)
    .post(addUser);

app.route("/api/v1/users/:id")
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser);


async function getUsers(_, res) {
    if (!users) {
        res.status(404).json({
            status: "failed",
            code: 404,
            message: "no users found"
        });
        return;
    }

    res.status(200).json({
        status: "success",
        code: 200,
        count: users.length,
        data: {
            users: users
        }
    });
};

async function getUser(req, res) {
    const userId = Number.parseInt(req.params.id);
    const user = users
        .find(u => u.id === userId);

    if (!user) {
        res.status(404).json({
            status: "failed",
            code: 404,
            message: `User not found with id '${userId}'`
        });

        return;
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            user: user
        }
    });
};

async function addUser(req, res) {
    let newId = users[users?.length - 1]?.id ?? 0;
    newId++;

    const newUser = new User(
        newId,
        req.body.userName,
        req.body.password
    );

    users.push(newUser);

    try {
        await fsp.writeFile(
            "./data/users.json",
            JSON.stringify(users));
    } catch (err) {
        console.log("An Error Occur:", err.message);

        res.status(500).json({
            status: "failed",
            code: 500,
            message: "Internal Server Error"
        });
        return;
    }

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: newUser
        }
    });
};

async function updateUser(req, res) {
    const userId = Number.parseInt(req.params.id);
    const userToUpdate = users.find(u => u.id === userId);

    if (!userToUpdate) {
        res.status(404).json({
            status: "failed",
            code: 404,
            message: `User not found with id '${userId}'`
        });
        return;
    }
    
    userToUpdate.id = userId;
    userToUpdate.userName = req.body.userName;
    userToUpdate.password = req.body.password;

    try {
        await fsp.writeFile(
            "./data/users.json",
            JSON.stringify(users));
    } catch (err) {
        console.log("An Error Occur:", err.message);

        res.status(500).json({
            status: "failed",
            code: 500,
            message: "Internal Server Error"
        });
        return;
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            user: userToUpdate
        }
    });
};

async function deleteUser(req, res) {
    const userId = Number.parseInt(req.params.id);
    
    const userToDelete = users.find(u => u.id === userId);
    console.log("D - UserToDelete:", userToDelete);

    const indexOfUserToDelete = users.indexOf(userToDelete);
    console.log("indexOfUserToDelete:", indexOfUserToDelete);
    
    if (!userToDelete || indexOfUserToDelete === -1) {
        res.status(404).json({
            status: "failed",
            code: 404,
            message: `User not found with id '${userId}'`
        });
        return;
    }
    
    users.splice(indexOfUserToDelete, 1);
    
    try {
        await fsp.writeFile(
            "./data/users.json",
            JSON.stringify(users));
    } catch (err) {
        console.log("An Error Occur:", err.message);

        res.status(500).json({
            status: "failed",
            code: 500,
            message: "Internal Server Error"
        });
        return;
    }
    
    res.status(200).json({
        status: "success",
        code: 200
    });
};


const PORT = 3000;
const HOST_NAME = "127.0.0.1";
app.listen(PORT, HOST_NAME, () => {
    console.log("Server is Started.");
});
