const express = require("express");

const router = express.Router();

const salesController = require("../controllers/salesController");

//http://localhost:3000/api/sales
router.get("/", salesController.getSales);

//http://localhost:3000/api/sales/salestotal
router.get("/salestotal", salesController.getSalesTotal);

//http://localhost:3000/api/sales/exportsales
router.get("/exportsales", salesController.exportsales);

module.exports = router;
