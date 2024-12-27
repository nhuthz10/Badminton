import db from "../models/index";
const cloudinary = require("cloudinary").v2;
import { Op } from "sequelize";
require("dotenv").config();

let createNewBlogService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.title || !data.imageUrl || !data.description) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        await db.Blog.create({
          image: data.imageUrl,
          imageId: data.imageId,
          title: data.title,
          description: data.description,
          isPublished: data.isPublished,
          userId: data.userId,
          content: data.content,
          contentHTML: data.contentHTML,
        });
        resolve({
          errCode: 0,
          message: "Create a Blog succeed",
        });
      }
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        resolve({
          errCode: -2,
          message: "Error foreign key",
        });
      } else {
        reject(error);
      }
    }
  });
};

let deleteBlogService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let blog = await db.Blog.findOne({
          where: { id: id },
        });
        if (!blog) {
          resolve({
            errCode: 2,
            message: "Blog isn't exist",
          });
        } else {
          if (blog.imageId && blog.image) {
            cloudinary.uploader.destroy(blog.imageId);
          }
          await db.Blog.destroy({
            where: { id: id },
          });
          resolve({
            errCode: 0,
            message: "Delete Blog succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateBlogService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.title || !data.description) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let blog = await db.Blog.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (blog) {
          blog.title = data.title;
          blog.content = data.content;
          blog.contentHTML = data.contentHTML;
          blog.isPublished = data.isPublished;
          blog.description = data.description;
          if (data.imageUrl && data.imageId) {
            cloudinary.uploader.destroy(blog.imageId);
            blog.image = data.imageUrl;
            blog.imageId = data.imageId;
          }

          await blog.save();
          resolve({
            errCode: 0,
            message: "Update Blog succeed",
          });
        } else {
          resolve({
            errCode: 4,
            message: "Blog isn't exist",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllBlogAdminService = (limit, page, sort, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = {};
      if (!limit) limit = +process.env.LIMIT_MANAGE;
      if (!page) page = 1;
      if (!sort) sort = ["id", "DESC"];
      name === "undefined" ? (name = undefined) : name;
      if (name) filter.title = { [Op.substring]: name };
      let skip = (page - 1) * limit;
      const { count, rows } = await db.Blog.findAndCountAll({
        limit: limit,
        offset: skip,
        order: [sort],
        where: filter,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.User,
            as: "UserBlogData",
            attributes: ["id", "userName"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        total: count,
        currentPage: page,
        totalPage: Math.ceil(count / limit),
        data: rows,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllBlogUserService = (limit, page, sort, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = { isPublished: 1 };
      if (!limit) limit = +process.env.LIMIT_MANAGE;
      if (!page) page = 1;
      if (!sort) sort = ["id", "DESC"];
      name === "undefined" ? (name = undefined) : name;
      if (name) filter.title = { [Op.substring]: name };
      let skip = (page - 1) * limit;
      const { count, rows } = await db.Blog.findAndCountAll({
        limit: limit,
        offset: skip,
        order: [sort],
        where: filter,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.User,
            as: "UserBlogData",
            attributes: ["id", "userName"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        total: count,
        currentPage: page,
        totalPage: Math.ceil(count / limit),
        data: rows,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getBlogService = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!blogId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        const blog = await db.Blog.findOne({
          where: { id: blogId },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.User,
              as: "UserBlogData",
              attributes: ["id", "userName"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (!blog) {
          resolve({
            errCode: 4,
            message: "Blog isn't exist",
          });
        } else {
          resolve({
            errCode: 0,
            data: blog,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewBlogService,
  deleteBlogService,
  updateBlogService,
  getAllBlogAdminService,
  getAllBlogUserService,
  getBlogService,
};
