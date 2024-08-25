const express = require("express");
const router = express.Router();
const { createBlog, getBlog, getBlogByid, updateBlog, deleteBlog } = require("../controllers/blog");
const { signUp, login } = require("../controllers/auth");
router.post('/signUp', signUp);
router.post('/login', login);

router.post("/createBlog", createBlog);
router.get("/getBlog", getBlog);
router.get("/getBlogByid/:id", getBlogByid);
router.put("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = { router };