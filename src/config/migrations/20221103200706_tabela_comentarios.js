/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("comentarios", (table) => {
    table.increments("id");
    table
      .integer("id_usuario")
      .references("usuarios.id")
      .notNullable()
      .onDelete("CASCADE");
    table.text("comentario").notNullable();
    table.integer("id_postagem");
    table.integer("likes").defaultTo(0);
    table.timestamp("criado_em").defaultTo(knex.fn.now());
    table.timestamp("atualizado_em").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("comentarios");
};
