/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("youtube", (table) => {
    table.increments("id");
    table.text("titulo");
    table.text("link");
    table.text("thumbnails");
    table.text("criador_nome");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("youtube");
};
