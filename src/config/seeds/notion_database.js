/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("postagem_conteudos").del();
  await knex("postagem_conteudos").insert([
    {
      id_usuario: 1,
      titulo: "Migração de Carreira",
      tipo: "Artigo",
      trilha: "fullstack",
      criador_nome: "Orange Juice",
      duracao: "00:06:00",
      link: "https://medium.com/orangejuicefc/guia-definitivo-de-como-migrar-para-ux-design-5-passos-para-virar-um-ux-1675f71796b4",
      notion: true,
    },
  ]);
};
