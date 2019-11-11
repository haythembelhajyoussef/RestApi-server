const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

router.get("/", (req, res) => {
  queries.sales().then(sales => {
    res.json(sales);
  });
});

router.get("/salestotal", (req, res) => {
  queries.getSalesTotal().then(data => {
    res.json(data);
  });
});

module.exports = router;
