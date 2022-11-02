const app = require("../src/app");
const request = require("supertest");
const { DEFAULT_LOGIN, DEFAULT_UPDATE, DEFAULT_USUARIO } = require("./mocks");
let token = "";
//Resgatar token
beforeAll(async () => {
  const res = await request(app).post("/login").send(DEFAULT_LOGIN);
  token = res.body.token;
});

describe("TESTAR USUARIOS", () => {
  it("Cadastrar Usuarios (POST:/usuarios)", async () => {
    const res = await request(app).post("/usuarios").send(DEFAULT_USUARIO);
    expect(res.status).toBe(201);
  });
  it("Login (POST:/login)", async () => {
    const res = await request(app).post("/login").send(DEFAULT_LOGIN);
    expect(res.status).toBe(200);
  });
  it("Atualizar Usuarios (PUT:/usuarios)", async () => {
    const res = await request(app)
      .put("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send(DEFAULT_UPDATE);
    expect(res.status).toBe(204);
  });
});
describe("TESTAR TABELA NOTION", () => {
  it("TRILHA FULLSTACK", async () => {
    const res = await request(app).get("/notion/fullstack");
    expect(res.status).toBe(200);
  });
  it("TRILHA QA", async () => {
    const res = await request(app).get("/notion/qa");
    expect(res.status).toBe(200);
  });
  it("TRILHA UX UI", async () => {
    const res = await request(app).get("/notion/design");
    expect(res.status).toBe(200);
  });
});
