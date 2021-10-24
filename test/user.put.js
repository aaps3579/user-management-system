// Express app object
var app = require("../index");
// chai-http is plugin for chai
var chai = require("chai"),
  chaiHttp = require("chai-http");

var User = require("../models/user");
var should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  var jsonwebtoken = "";
  beforeEach((done) => {
    //Before each test we clear the database
    User.destroy({ truncate: true, where: {} }).then(() => {
      chai
        .request(app)
        .post("/token")
        .end((err, res) => {
          jsonwebtoken = res.text;
          done();
        });
    });
  });
  /*
   * Test the /PUT route
   */
  describe("/PUT user", () => {
    it("it should return a 403 status without authentication", (done) => {
      chai
        .request(app)
        .put("/api/users")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it("it should update name of the user", (done) => {
      const data = {
        fullname: "Amanpreet",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      };
      User.create(data).then((user) => {
        chai
          .request(app)
          .put(`/api/users/${user.id}`)
          .auth(jsonwebtoken, { type: "bearer" })
          .send({ fullname: "Amanpreet Singh" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("fullname").eql("Amanpreet Singh");
            done();
          });
      });
    });

    it("it should not update email of the user if email is already taken", (done) => {
      const user_data = {
        fullname: "Amanpreet",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      };

      const user_data_2 = {
        fullname: "John",
        email: "john@gmail.com",
        password: 123456,
      };
      User.bulkCreate([user_data, user_data_2]).then((users) => {
        chai
          .request(app)
          .put(`/api/users/${users[0].id}`)
          .auth(jsonwebtoken, { type: "bearer" })
          .send({ email: "john@gmail.com" })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    it("it should return 404 status if user is not found", (done) => {
      chai
        .request(app)
        .put(`/api/users/101`)
        .auth(jsonwebtoken, { type: "bearer" })
        .send({ email: "john@gmail.com" })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
