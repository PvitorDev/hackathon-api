/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("postagem_curtidas", (table) => {
    table.increments("id");
    table.integer("id_usuario").references("usuarios.id").notNullable();
    table.integer("id_conteudos").references("postagem_conteudos.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("postagem_curtidas");
};
