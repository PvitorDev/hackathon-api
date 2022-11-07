/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const fs = require("fs/promises");

 exports.seed = async function (knex) {
   // Deletes ALL existing entries
   await knex("postagem_conteudos").del();
   await knex("postagem_conteudos").insert(
     JSON.parse(await fs.readFile("src/config/notionDB/alldb.json")),
   );
 };
