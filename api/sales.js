const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

const xlsx = require("xlsx");

router.get("/", (req, res) => {
  queries.getSales().then(sales => {
    res.json(sales);
  });
});

router.get("/salestotal", (req, res) => {
  queries.getSalesTotal().then(data => {
    res.json(data);
  });
});

router.get("/exportsales", (req, res) => {
  queries
    .getSales()
    .orderBy("date") //ordered by date ASC
    .then(sales => {
      const fileName = "xlsx/sales.xlsx";
      const workBook = xlsx.utils.book_new();
      workBook.Props = {
        Title: "Sales list",
        Subject: "Sales list",
        Author: "Haythem Bel Haj Youssef",
        CreatedDate: new Date()
      };
      workBook.SheetNames.push("Sales ascending");
      workBook.SheetNames.push("Sales descending");
      const workSheetAscData = [["ID", "Name", "Amount"]];
      const workSheetDescData = [["ID", "Name", "Amount"]];

      //Asc
      sales.forEach(d => {
        workSheetAscData.push([d.id, d.name, d.amount]);
      });
      //Desc
      sales.reverse().forEach(d => {
        workSheetDescData.push([d.id, d.name, d.amount]);
      });
      //Asc
      const workSheet = xlsx.utils.aoa_to_sheet(workSheetAscData);
      //Desc
      const workSheetDesc = xlsx.utils.aoa_to_sheet(workSheetDescData);

      const range = workSheet["!ref"];
      const decodeRange = xlsx.utils.decode_range(range);
      const lastColumn = decodeRange.e.r + 1;
      //Asc
      xlsx.utils.sheet_add_aoa(
        workSheet,
        [[, "Total", { f: "SUM(C1:C" + lastColumn + ")" }]],
        {
          origin: -1
        }
      );
      //Desc
      xlsx.utils.sheet_add_aoa(
        workSheetDesc,
        [[, "Total", { f: "SUM(C1:C" + lastColumn + ")" }]],
        {
          origin: -1
        }
      );
      workBook.Sheets["Sales ascending"] = workSheet;
      workBook.Sheets["Sales descending"] = workSheetDesc;
      xlsx.writeFile(workBook, fileName);
      res.json({ filePath: fileName });
    });
});

module.exports = router;
