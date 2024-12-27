import express from "express";
import productTypeController from "../controllers/productTypeController";
import { authAdmin } from "../middlewares/auth";
let router = express.Router();

router.post(
  "/create-product-type",
  authAdmin,
  productTypeController.handleCreateNewProductType
);
router.delete(
  "/delete-product-type",
  authAdmin,
  productTypeController.handleDeleteProductType
);
router.put(
  "/update-product-type",
  authAdmin,
  productTypeController.handleUpdateProductType
);
router.get(
  "/get-all-product-type",
  productTypeController.handleGetAllProductType
);

router.get("/get-product-type", productTypeController.handleGetProductType);

router.get(
  "/get-product-type-detail",
  productTypeController.handleGetProductTypeDetail
);

export default router;
