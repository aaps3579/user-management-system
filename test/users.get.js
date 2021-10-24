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
   * Test the /GET routes
   */
  describe("/GET user(s)", () => {
    it("it should return an 403 status without authentication", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it("it should return empty list", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .auth(jsonwebtoken, { type: "bearer" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it("it should return array with only single user", (done) => {
      User.create({
        fullname: "Amanpreet Singh",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      }).then((user) => {
        chai
          .request(app)
          .get("/api/users")
          .auth(jsonwebtoken, { type: "bearer" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
    it("it should return single user", (done) => {
      User.create({
        fullname: "Amanpreet Singh",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      }).then((user) => {
        chai
          .request(app)
          .get(`/api/users/${user.id}`)
          .auth(jsonwebtoken, { type: "bearer" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("fullname").eql(user.fullname);
            res.body.should.have.property("email").eql(user.email);
            done();
          });
      });
    });
    it("it should return user not found 404", (done) => {
      chai
        .request(app)
        .get(`/api/users/101`)
        .auth(jsonwebtoken, { type: "bearer" })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
