/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("plano_estudos", (table) => {
    table.increments("id");
    table
      .integer("id_usuario")
      .references("usuarios.id")
      .notNullable()
      .onDelete("CASCADE");
    table.text("nome").notNullable();
    table.boolean("concluido").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("plano_estudos");
};
