const knex = require("./knex"); //the connection

module.exports = {
  getSales() {
    return knex("sale").select("id", "name", "amount"); //.select('*')
  },
  getSalesTotal() {
    return knex("sale")
      .sum("amount as amount")
      .count();
  }
};
