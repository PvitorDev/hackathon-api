/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("postagem_conteudos", (table) => {
    table.increments("id");
    table.integer("id_usuario").references("usuarios.id").onDelete("CASCADE");
    table.text("titulo").notNullable();
    table.text("tipo").notNullable();
    table.text("trilha").notNullable();
    table.text("criador_nome");
    table.text("duracao");
    table.text("link").notNullable();
    table.boolean("notion").defaultTo(false);
    table.timestamp("criado_em").defaultTo(knex.fn.now());
    table.timestamp("atualizado_em").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("postagem_conteudos");
};
