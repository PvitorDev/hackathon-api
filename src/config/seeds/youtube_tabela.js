/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const fs = require("fs/promises");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("youtube").del();
  await knex("youtube").insert(
    JSON.parse(await fs.readFile("src/config/youtube/allvideos.json")),
  );
};
