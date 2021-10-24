var express = require("express");
const db = require("./db");

const router = express.Router();
const User = require("./models/user");

router.get("/", async (req, res, next) => {
  const users = await User.findAll();
  res.send(users);
});

router.get("/:id", async (req, res, next) => {
  let user = await User.findByPk(req.params.id);
  if (user == null) {
    res.sendStatus(404);
  } else {
    res.send(user);
  }
});

router.post("/", async (req, res, next) => {
  if (!req.body.fullname || !req.body.email || !req.body.password) {
    res.sendStatus(400);
  }
  const user = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    res.status(200).send(await User.create(user));
  } catch (error) {
    if (error instanceof db.ValidationError) {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  if (!req.params.id) return res.sendStatus(400);

  if (!req.body.fullname && !req.body.email && !req.body.password)
    res.sendStatus(400);

  let user = await User.findByPk(req.params.id);
  if (!user) return res.sendStatus(404);

  const fields = [];
  if (req.body.email && user.email != req.body.email) {
    if (
      await User.findOne({
        where: { email: req.body.email },
      })
    )
      return res.status(400).send("Email is already in use");
    else fields.push("email");
  }

  if (req.body.fullname) {
    user.fullname = req.body.fullname;
    fields.push("fullname");
  }

  if (req.body.password) {
    user.password = req.body.password;
    fields.push("password");
  }

  try {
    await user.save({ fields: fields });
    res.status(200).send(await user.reload());
  } catch (error) {
    if (error instanceof db.ValidationError)
      res.status(400).send(error.message);
    else res.status(500).send("Something went wrong");
  }
});

router.delete("/:id", async (req, res, next) => {
  if (!req.params.id) return res.sendStatus(400);

  let user = await User.findByPk(req.params.id);
  if (user == null) res.sendStatus(404);
  else {
    try {
      await user.destroy();
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }
});

module.exports = router;
