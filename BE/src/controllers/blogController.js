import blogService from "../services/blogService";
const cloudinary = require("cloudinary").v2;

let handleCreateNewBlog = async (req, res) => {
  try {
    let data = req.body;
    let fileData = req.file;
    data.imageUrl = fileData?.path;
    data.imageId = fileData?.filename;
    let message = await blogService.createNewBlogService(data);
    if (message.errCode === 0) return res.status(201).json(message);
    else {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }
      return res.status(400).json(message);
    }
  } catch (error) {
    let fileData = req.file;
    if (fileData) {
      cloudinary.uploader.destroy(fileData.filename);
    }
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error form the server!!!",
    });
  }
};

let handleDeleteBlog = async (req, res) => {
  try {
    let id = req.query.id;
    let message = await blogService.deleteBlogService(id);
    if (message.errCode === 0) return res.status(200).json(message);
    else return res.status(400).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error form the server!!!",
    });
  }
};

let handleUpdateBlog = async (req, res) => {
  try {
    let data = req.body;
    let fileData = req.file;
    data.imageUrl = fileData?.path;
    data.imageId = fileData?.filename;
    let message = await blogService.updateBlogService(data);
    if (message.errCode === 0) return res.status(200).json(message);
    else {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }
      return res.status(400).json(message);
    }
  } catch (error) {
    let fileData = req.file;
    if (fileData) {
      cloudinary.uploader.destroy(fileData.filename);
    }
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error form the server!!!",
    });
  }
};

let handleGetAllBlogUser = async (req, res) => {
  try {
    let { limit, page, sort, name } = req.query;
    let message = await blogService.getAllBlogUserService(
      +limit,
      +page,
      sort,
      name
    );
    if (message.errCode === 0) return res.status(200).json(message);
    else return res.status(400).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from the server!!!",
    });
  }
};

let handleGetAllBlogAdmin = async (req, res) => {
  try {
    let { limit, page, sort, name } = req.query;
    let message = await blogService.getAllBlogAdminService(
      +limit,
      +page,
      sort,
      name
    );
    if (message.errCode === 0) return res.status(200).json(message);
    else return res.status(400).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from the server!!!",
    });
  }
};

let handleGetBlog = async (req, res) => {
  try {
    let message = await blogService.getBlogService(req.query.blogId);
    if (message.errCode === 0) return res.status(200).json(message);
    else return res.status(400).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from the server!!!",
    });
  }
};

module.exports = {
  handleCreateNewBlog,
  handleDeleteBlog,
  handleUpdateBlog,
  handleGetAllBlogUser,
  handleGetAllBlogAdmin,
  handleGetBlog,
};
