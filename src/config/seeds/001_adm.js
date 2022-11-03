/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("usuarios").del();
  await knex("usuarios").insert({
    nome: "Fcamara ADM",
    email: "fcamara@adm.com",
    senha: "fcamara",
    xp: 100000,
    nivel: 1000,
    adm: true,
  });
};
