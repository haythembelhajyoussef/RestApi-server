const knex = require("./knex"); //the connection

module.exports = {
  getSalesPagination(page, perPage) {
    return knex("sale")
      .select("id", "name", "amount") //.select('*')
      .paginate(perPage, page, true);
  },
  getSales() {
    return knex("sale").select("id", "name", "amount");
  },
  getSalesTotal() {
    return knex("sale")
      .sum("amount as amount")
      .count();
  }
};
