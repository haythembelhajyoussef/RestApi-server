const sales = require("../sales");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("sale")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("sale").insert(sales);
    });
};
