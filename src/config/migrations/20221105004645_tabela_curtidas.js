/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("postagem_curtidas", (table) => {
    table.integer("id_usuario").references("usuarios.id").notNullable();
    table.text("id_postagem").references("");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("postagem_curtidas");
};
