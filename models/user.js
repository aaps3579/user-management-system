const bcrypt = require("bcryptjs");
const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const sequelize = db.sequelize;
class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 20],
          msg: "Name should be between 6 and 20 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(64),
      unique: {
        msg: "Email is already in use.",
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please enter valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 50],
          msg: "Password should be between 6 and 50 characters",
        },
      },
    },
  },
  {
    sequelize,
    // We can access this model using sequelize.models.User anywhere in the application
    modelName: "User",
  }
);
/**
 * beforeSave hook. Runs everytime before a save operation to db.
 *
 * @param {User} user User Model Information.
 */
User.beforeSave((user, options) => {
  try {
    // generate a hashed password
    user.password = bcrypt.hashSync(user.password.toString(), 10);
  } catch (err) {
    throw Error("Unable to create hashed password");
  }
});

module.exports = User;
