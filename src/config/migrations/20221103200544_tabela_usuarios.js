/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id");
    table.text("nome").notNullable();
    table.text("email").unique().notNullable();
    table.text("senha").notNullable();
    table.text("trilha");
    table.text("funcao").defaultTo("usuario");
    table.text("evolucao");
    table.integer("xp").defaultTo(0);
    table.integer("nivel").defaultTo(0);
    table.boolean("admin").defaultTo(false);
    table.text("posts");
    table.text("fav");
    table.text("conteudos");
    table.text("comentários");
    table.timestamp("criado_em").defaultTo(knex.fn.now());
    table.timestamp("atualizado_em").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("usuarios");
};
