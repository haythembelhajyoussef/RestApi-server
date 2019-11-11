exports.up = function(knex) {
  return knex.schema.createTable("sale", table => {
    table.increments();
    table.text("name");
    table.float("amount");
    table.datetime("date");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("sale");
};
