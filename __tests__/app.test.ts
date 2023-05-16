import request from "supertest";

import app from "../src/index";

describe("Test index.ts", () => {
  afterEach(() => {
    app.close();
  });

  test("Servidor ruta Test", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Hola" });
  });

  test("Lista de pelicualas pagina 1 Test", async () => {
    const res = await request(app).get("/app/movies/1");
    expect(res.statusCode).toBe(200)
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.status).toBe(200)
    expect(typeof res.body.movies).toBe("object")
  });

  test("Lista de pelicualas error por string en numero de pagina Test", async () => {
    const res = await request(app).get("/app/movies/test");
    expect(res.statusCode).toBe(200)
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.status).toBe(500)
    expect(res.body.errorDetail).toBe("ERROR PAGINA, SOLO NUMEROS, Y MAYOR A 1")
  });
});