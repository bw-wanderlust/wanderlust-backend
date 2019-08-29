const express = require("express");
const router = express.Router();

const helper = require("../helpers/tripsDB");

const { authenticate, generateToken } = require("../middleware/authMiddleware");

const allTrips = (req, res) => {
  helper
    .getTrips()
    .then(trips => {
      res.status(201).json(trips);
    })
    .catch(err => {
      res.status(500).json({
        error: "failed to get trips"
      });
    });
};

const TripById = (req, res) => {
  const { id } = req.params;
  helper
    .getTrips(id)
    .then(row => {
      console.log("trip by id endpoint", row);
      row
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
  const trip = req.body;
  helper
    .updateTrip(id, trip)
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
      res.status(500).send({
        error: err
      });
    });
};

router.get("/trips", allTrips);
router.get("/trips/:id", TripById);
router.put("/trips/:id", editTrip);
router.delete("/trips/:id", removeTrip);

module.exports = router;
