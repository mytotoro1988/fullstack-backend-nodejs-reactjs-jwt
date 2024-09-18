const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUserService = async (name, email, password) => {
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    let result = await User.create({
      name,
      email,
      password: hashPassword,
      role: "admin",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loginService = async (email, password) => {
  try {
    // Tìm người dùng bằng email
    const user = await User.findOne({ email: email });

    if (user) {
      // Sử dụng bcrypt.compare để so sánh mật khẩu người dùng với mật khẩu hash trong DB
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        //create access token
        const payload = {
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPRIRE,
        });

        return {
          EC: 0,
          access_token,
          user: {
            email: user.email,
            name: user.name,
          },
        }; // Trả về user nếu mật khẩu khớp
      } else {
        console.error("Email or password is wrong");

        console.log("1");

        return {
          EC: 2,
          EM: "Email/Password không hợp lệ",
        };
      }
    } else {
      console.log("221212s");

      return {
        EC: 1,
        EM: "Email/Password không hợp lệ",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
};
