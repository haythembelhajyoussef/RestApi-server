const express = require("express");

const router = express.Router();

const salesController = require("../controllers/salesController");

//http://localhost:3000/api/sales
//http://localhost:3000/api/sales?page=1
//http://localhost:3000/api/sales?perPage=1
//http://localhost:3000/api/sales?page=1&perPage=1
router.get("/", salesController.getSales);

//http://localhost:3000/api/sales/salestotal
router.get("/salestotal", salesController.getSalesTotal);

//http://localhost:3000/api/sales/exportsales
router.post("/exportsales", salesController.exportsales);

module.exports = router;
