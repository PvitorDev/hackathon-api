/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("postagens", (table) => {
    table.increments("id");
    table
      .integer("id_usuario")
      .references("usuarios.id")
      .notNullable()
      .onDelete("CASCADE");
    table.text("titulo").notNullable();
    table.text("descricao").notNullable();
    table.text("tipo").notNullable();
    table.text("criador_nome");
    table.timestamp("criado_em").defaultTo(knex.fn.now());
    table.timestamp("atualizado_em").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("postagens");
};
