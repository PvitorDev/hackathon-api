/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("itens_estudos", (table) => {
    table.increments("id");
    table
      .integer("id_usuario")
      .references("usuarios.id")
      .notNullable()
      .onDelete("CASCADE");
    table
      .integer("id_conteudo")
      .references("postagem_conteudos.id")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("id_plano")
      .references("plano_estudos.id")
      .onDelete("CASCADE")
      .notNullable();
    table.boolean("concluido").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("itens_estudos");
};
