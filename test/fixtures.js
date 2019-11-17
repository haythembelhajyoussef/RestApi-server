const sales = [
  {
    id: 26,
    name: "0001",
    amount: 12.3
  },
  {
    id: 27,
    name: "0002",
    amount: 7.51
  },
  {
    id: 28,
    name: "0003",
    amount: 15.4
  },
  {
    id: 29,
    name: "0004",
    amount: 30.4458
  }
];

const salestotal = {
  amount: 65.6558,
  count: "4"
};

const exportsales = {
  filePath: "xlsx/sales2.xlsx"
};

module.exports = {
  sales,
  salestotal,
  exportsales
};
