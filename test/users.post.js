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
   * Test the /POST route
   */
  describe("/POST user", () => {
    it("it should return an 403 status without authentication", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it("it should add a user", (done) => {
      const user = {
        fullname: "Amanpreet Singh",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      };
      chai
        .request(app)
        .post(`/api/users`)
        .auth(jsonwebtoken, { type: "bearer" })
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("fullname").eql(user.fullname);
          res.body.should.have.property("email").eql(user.email);
          done();
        });
    });

    it("[ Case 1 : Invalid Name ] it should not add a user", (done) => {
      const user = {
        fullname: "",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      };
      chai
        .request(app)
        .post(`/api/users`)
        .auth(jsonwebtoken, { type: "bearer" })
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("[ Case 2 : Invalid Email ] it should not add a user", (done) => {
      const user = {
        fullname: "Amanpreet Singh",
        email: "abc",
        password: 123456,
      };
      chai
        .request(app)
        .post(`/api/users`)
        .auth(jsonwebtoken, { type: "bearer" })
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("[ Case 3 : Duplicate Email ] it should not add a user", (done) => {
      const user = {
        fullname: "Amanpreet Singh",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      };
      User.create({
        fullname: "Amanpreet Singh",
        email: "amanpreet.3579@gmail.com",
        password: 123456,
      }).then(() => {
        chai
          .request(app)
          .post(`/api/users`)
          .auth(jsonwebtoken, { type: "bearer" })
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    it("[ Case 4 : Invalid Password ] it should not add a user", (done) => {
      const user = {
        fullname: "Amanpreet Singh",
        email: "abc",
        password: 123,
      };
      chai
        .request(app)
        .post(`/api/users`)
        .auth(jsonwebtoken, { type: "bearer" })
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
