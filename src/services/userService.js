const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
        return user; // Trả về user nếu mật khẩu khớp
      } else {
        console.error("Email or password is wrong");
        return {
          EC: 2,
          EM: "Email/Password không hợp lệ",
        };
      }
    } else {
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
