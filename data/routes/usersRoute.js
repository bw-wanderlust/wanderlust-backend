const express = require("express");
const router = express.Router();

const helper = require("../helpers/tripsDB");

const allTrips = (req, res) => {
  helper
    .getTrips()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).send({
        error: "getting trips failed"
      });
    });
};

const tripById = (req, res) => {
  const { id } = req.params;
  helper
    .getTrips(id)
    .then(row => {
      !row[0]
        ? res.json(row)
        : res.status(404).json({
            error: "trip with that ID not found"
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "getting trip by id failed"
      });
    });
};

const editTrip = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  let password = user.password;
  // console.log("no hash :", user);
  if (password) {
    user.password = bcrypt.hashSync(password, 12);
    // console.log("w/hash :", user);
  }

  helper
    .updateTrip(id, user)
    .then(number => {
      res.json(number);
    })
    .catch(err => {
      res.status(500).json({
        error: "Internal router issue with the edit of the trip."
      });
    });
};

const removeTrip = (req, res) => {
  const { id } = req.params;
  helper
    .deleteTrip(id)
    .then(number => {
      !number
        ? res.status(404).json({
            message: "trip Not Found"
          })
        : res.json({
            message: "Its gone!"
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "Internal router issue with the deletion of the trip."
      });
    });
};

router.get("/trips", allTrips);
router.get("/trips/:id", tripById);
router.put("/trips/:id", editTrip);
router.delete("/trips/:id", removeTrip);

module.exports = router;
