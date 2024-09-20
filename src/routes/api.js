const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
} = require("../controllers/userController");

const routerAPI = express.Router();

/**
 * @swagger
 * /v1/api/register:
 *   post:
 *     summary: Đăng ký người dùng
 *     description: API để đăng ký người dùng mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - password
 *               - email
 *     responses:
 *       200:
 *         description: Call API success
 */

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')

// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);

routerAPI.post("/register", createUser);

/**
 * @swagger
 * /v1/api/login:
 *   post:
 *     summary: Đăng nhập
 *     description: API để đăng nhập.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Call API success
 */
routerAPI.post("/login", handleLogin);

/**
 * @swagger
 * /v1/api/user:
 *   get:
 *     summary: lấy danh sách người dùng
 *     responses:
 *       200:
 *         description: Phản hồi thành công
 */

routerAPI.get("/user", getUser);

module.exports = routerAPI; //export default
