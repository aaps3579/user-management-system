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
   * Test the /DELETE routes
   */
  describe("/DELETE user", () => {
    it("it should return a 403 status without authentication", (done) => {
      chai
        .request(app)
        .delete("/api/users")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it("it should delete a user", (done) => {
      User.create({
        fullname: "Amanpreet Singh",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      }).then((user) => {
        chai
          .request(app)
          .delete(`/api/users/${user.id}`)
          .auth(jsonwebtoken, { type: "bearer" })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
    it("it should not delete a user [ 404 error ]", (done) => {
      User.create({
        fullname: "Amanpreet Singh",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      }).then((user) => {
        chai
          .request(app)
          .delete(`/api/users/101`)
          .auth(jsonwebtoken, { type: "bearer" })
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});
