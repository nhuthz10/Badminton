"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRectangleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import "./ModalDelete.scss";

const ModalDelete = ({ handleDelete }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickDelete = () => {
    handleDelete();
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        style={{ width: "20px", height: "30px", cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red", height: "100%", width: "100%" }}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="Modal-Global"
      >
        <div className="Modal-Delete">
          <div
            style={{
              width: "100%",
              height: "50%",
            }}
          >
            <h1
              style={{
                fontSize: "var(--title-fontSize)",
                marginTop: 30,
                textAlign: "center",
              }}
            >
              BẠN CÓ MUỐN XOÁ ?
            </h1>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              textAlign: "center",
            }}
          >
            <Button onClick={handleClose}>
              <FontAwesomeIcon
                icon={faRectangleXmark}
                style={{ fontSize: 30, color: "red" }}
              />
            </Button>
            <Button onClick={handleClickDelete}>
              <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 30 }} />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDelete;
