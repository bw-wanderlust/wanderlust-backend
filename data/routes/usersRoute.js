const express = require("express");
const router = express.Router();

const helper = require("../helpers/userDB");
const bcrypt = require("bcrypt");

const { authenticate, generateToken } = require("../middleware/authMiddleware");

const register = (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12);
  creds.password = hash;
  if (creds.username && creds.password && creds.firstName && creds.lastName) {
    helper
      .addUser(creds)
      .then(ids => {
        const id = ids[0];
        userDb
          .getUser(id)
          .then(user => {
            const token = generateToken(user);
            res.status(201).json({ token });
          })
          .catch(err => {
            res.status(500).json("Failed to authenticate user");
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to resister user" });
      });
  } else {
    res
      .status(404)
      .json({ message: "Missing username/password/(first/last)name" });
  }
};

const login = (req, res) => {
  // implement user login
  const creds = req.body;
  if (creds.username && creds.password) {
    helper
      .login(creds.username)
      .then(user => {
        if (
          user.password &&
          bcrypt.compareSync(creds.password, user.password)
        ) {
          const token = generateToken(user);
          res.status(201).json({ token });
        } else {
          res.status(500).json({ message: "Failed to authenticate" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Failed to login" });
      });
  } else {
    res.status(404).json({ message: "username/password Missing" });
  }
};

const allUsers = (req, res) => {
  helper
    .getUsers()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).send({
        error: err.message
      });
    });
};

const userById = (req, res) => {
  const { id } = req.params;
  helper
    .getUsers(id)
    .then(row => {
      console.log("user by id endpoint", row);
      !row[0]
        ? res.json(row)
        : res.status(404).json({
            error: "User with that ID not found"
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "getting user by id failed"
      });
    });
};

const editUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  let password = user.password;
  console.log("no hash :", user);
  if (password) {
    user.password = bcrypt.hashSync(password, 12);
    console.log("w/hash :", user);
  }

  helper
    .updateUser(id, user)
    .then(number => {
      res.json(number);
    })
    .catch(err => {
      res.status(500).json({
        error: "Internal router issue with the edit of the user."
      });
    });
};

const removeUser = (req, res) => {
  const { id } = req.params;
  helper
    .deleteUser(id)
    .then(number => {
      !number
        ? res.status(404).json({
            message: "user Not Found"
          })
        : res.json({
            message: "Its gone!"
          });
    })
    .catch(err => {
      res.status(500).send({
        error: err
      });
    });
};

router.post("/users/register", register);
router.post("/users/login", login);
router.get("/users", allUsers);
router.get("/users/:id", userById);
router.put("/users/:id", editUser);
router.delete("/users/:id", removeUser);

module.exports = router;
