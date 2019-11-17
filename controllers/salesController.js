const queries = require("../db/queries");

const xlsx = require("xlsx");

const getSales = (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 2;

  queries.getSalesPagination(page, perPage).then(sales => {
    res.send(sales);
  });
};

const getSalesTotal = (req, res) => {
  queries.getSalesTotal().then(totalsales => {
    res.send(totalsales[0]);
  });
};

const exportsales = (req, res) => {
  queries
    .getSales()
    .orderBy("date") //ordered by date ASC
    .then(sales => {
      const filePath = req.body.filePath;
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
      xlsx.writeFile(workBook, filePath);
      res.json({ filePath: filePath });
    });
};

module.exports = { getSales, getSalesTotal, exportsales };
