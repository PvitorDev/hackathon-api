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
    table.integer("numero_posts").defaultTo(0);
    table.integer("numero_fav").defaultTo(0);
    table.integer("numero_conteudos").defaultTo(0);
    table.integer("numero_respostas").defaultTo(0);
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
