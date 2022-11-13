/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const fs = require("fs/promises");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("usuarios").del();
  await knex("usuarios").insert(
    JSON.parse(await fs.readFile("src/config/populate/usuarios.json")),
  );
};
