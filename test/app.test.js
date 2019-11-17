const Request = require("supertest");
const expect = require("chai").expect;
const knex = require("../db/knex");

const app = require("../app");

const fixtures = require("./fixtures");

describe("Wino test", () => {
  before(done => {
    //run migration
    knex.migrate
      .latest()
      .then(() => {
        //run seeds
        return knex.seed.run();
      })
      .then(() => done());
  });
});

it("Get sales", done => {
  Request(app)
    .get("/api/sales")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response.body).to.be.a("array");
      expect(response.body).to.deep.equal(fixtures.sales);
      done();
    });
});

it("Get sales total", done => {
  Request(app)
    .get("/api/sales/salestotal")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response.body).to.be.a("object");
      expect(response.body).to.deep.equal(fixtures.salestotal);
      done();
    });
});

it("Export sales", done => {
  Request(app)
    .post("/api/sales/exportsales")
    .send(fixtures.exportsales)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response.body).to.be.a("object");
      expect(response.body).to.deep.equal(fixtures.exportsales);
      done();
    });
});
