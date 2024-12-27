"use client";
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateBlogService } from "@/services/blogService";
import { logOut } from "@/redux-toolkit/userSlice";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BlogPost = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const userId = useSelector((state) => state.user.userInfo?.id);
  const [imageValue, setImageValue] = useState("/images/ImgNoProduct.png");
  const [fileImage, setFileImage] = useState("");
  const [checkImage, setCheckImage] = useState(false);
  const [content, setContent] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (submitData) => {
    if (!imageValue || !fileImage) {
      setCheckImage(true);
      return;
    }
    try {
      dispatch(loadingAdmin(true));
      const formData = new FormData();
      formData.append("image", fileImage);
      formData.append("userId", userId);
      formData.append("title", submitData.blogTitle);
      formData.append("description", submitData.blogDes);
      formData.append("isPublished", submitData.isPublished);
      formData.append("content", content);
      formData.append("contentHTML", contentHTML);

      let res = await handleCreateBlogService(formData);

      if (res && res.errCode === 0) {
        toast.success("Thêm bài viết thành công");
        setValue("blogTitle", "");
        setValue("isPublished", "");
        setValue("blogDes", "");
        setContent("");
        setContentHTML("");
        setImageValue("/images/ImgNoProduct.png");
        setFileImage("");

        router.push("/blog");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  const handleChangeMarkdown = ({ html, text }) => {
    setContent(text);
    setContentHTML(html);
  };

  const handleChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let objUrl = URL.createObjectURL(file);
      setFileImage(file);
      setImageValue(objUrl);
      setCheckImage(false);
    } else {
      setFileImage("");
      setImageValue("/images/ImgNoProduct.png");
      setCheckImage(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="model-add-update">
      <h1 className="model-add-update-header">Thêm bài viết</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: 260,
          }}
        >
          <Image
            src={imageValue}
            alt=""
            height={230}
            width={180}
            style={{
              height: 230,
              width: 180,
              objectFit: "containt",
              borderRadius: 10,
              border: "1px solid gray",
            }}
          ></Image>
          {checkImage && (
            <p
              style={{
                color: "red",
                fontSize: "var(--small-fontSize)",
                marginTop: "1rem",
              }}
            >
              Tải hình ảnh áp phích bài viết
            </p>
          )}
        </div>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            height: "4rem",
          }}
        >
          Tải ảnh lên
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleChangeImage(e)}
          />
        </Button>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Tiêu đề</p>
          <Controller
            control={control}
            name="blogTitle"
            rules={{
              required: "Nhập tiêu đề bài viết",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.blogTitle ? true : false}
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                variant="filled"
                size="small"
                hiddenLabel
                className="modal-add-update-input-text-field"
              />
            )}
          />
          {errors.blogTitle && (
            <p className="error-message-flex">{errors.blogTitle.message}</p>
          )}
        </div>
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Trạng thái</p>
          <Controller
            control={control}
            name="isPublished"
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.isPublished ? true : false}
                select
                variant="filled"
                hiddenLabel
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                className="modal-add-update-input-text-field"
                SelectProps={{
                  IconComponent: () => (
                    <ArrowDropDownIcon
                      style={{
                        fontSize: "3.5rem",
                      }}
                    />
                  ),
                }}
              >
                <MenuItem
                  value={0}
                  style={{
                    fontSize: "var(--text-fontSize)",
                  }}
                >
                  Nháp
                </MenuItem>
                <MenuItem
                  value={1}
                  style={{
                    fontSize: "var(--text-fontSize)",
                  }}
                >
                  Đăng bài
                </MenuItem>
              </TextField>
            )}
          />
          {errors.isPublished && (
            <p className="error-message-flex">{errors.isPublished.message}</p>
          )}
        </div>
      </div>

      <div className="modal-add-update-input-wrapper">
        <div className="modal-add-update-input modal-add-update-input-flex">
          <p className="modal-add-update-input-label">Mô tả</p>
          <Controller
            control={control}
            name="blogDes"
            rules={{
              required: "Nhập mô tả bài viết",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.blogDes ? true : false}
                InputProps={{
                  style: {
                    fontSize: "var(--text-fontSize)",
                  },
                }}
                variant="filled"
                size="small"
                hiddenLabel
                className="modal-add-update-input-text-field"
              />
            )}
          />
          {errors.blogDes && (
            <p className="error-message-flex">{errors.blogDes.message}</p>
          )}
        </div>
      </div>

      <div>
        <p className="modal-add-update-input-label">Nội dung</p>
        <MdEditor
          style={{
            width: "100%",
            height: "500px",
            fontSize: "var(--text-fontSize)",
            marginTop: "15px",
          }}
          renderHTML={(text) => mdParser.render(text)}
          value={content}
          onChange={handleChangeMarkdown}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        className="btn"
        style={{ margin: "30px 0" }}
      >
        Thêm
      </Button>
    </form>
  );
};

export default BlogPost;
