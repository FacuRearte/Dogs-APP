/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Temperament, conn } = require("../../src/db.js");
const { dogs, temperaments } = require("../arrays");

const agent = session(app);

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.bulkCreate(dogs)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });

  describe("POST /dogs", () => {
    it("Create dog", () => {
      agent.post("/dogs").send({
        name: {},

        height: dogs[0].height,

        weight: dogs[0].weight,

        lifeSpan: dogs[0].lifeSpan,

        temperament: temperaments[0]
      })
      .expect(200)
    });
  });
});
