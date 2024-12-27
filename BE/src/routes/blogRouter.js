import express from "express";
import blogController from "../controllers/blogController";
import uploadCloud from "../middlewares/uploadImg";
import { authAdmin } from "../middlewares/auth";
let router = express.Router();

router.post(
  "/create-blog",
  uploadCloud.single("image"),
  authAdmin,
  blogController.handleCreateNewBlog
);

router.delete("/delete-blog", authAdmin, blogController.handleDeleteBlog);

router.put(
  "/update-blog",
  uploadCloud.single("image"),
  authAdmin,
  blogController.handleUpdateBlog
);
router.get("/get-all-user-blog", blogController.handleGetAllBlogUser);

router.get(
  "/get-all-admin-blog",
  authAdmin,
  blogController.handleGetAllBlogAdmin
);

router.get("/get-blog", blogController.handleGetBlog);

export default router;
