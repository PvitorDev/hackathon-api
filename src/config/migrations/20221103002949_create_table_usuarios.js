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
    table.text("funcao");
    table.bigint("xp").defaultTo(0);
    table.bigint("nivel").defaultTo(0);
    table.boolean("adm").defaultTo(false);
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
