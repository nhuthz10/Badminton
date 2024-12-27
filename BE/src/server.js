import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./routes";
import connectDB from "./config/connectDB";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import orderService from "./services/orderService";
import db from "./models/index";
import cron from "node-cron";
import { Op } from "sequelize";
import notificationService from "./services/notificationService";
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [process.env.URL_CLIENT, process.env.URL_CLIENT_MANAGEMENT],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

initWebRoutes(app);
connectDB();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.URL_CLIENT, process.env.URL_CLIENT_MANAGEMENT],
    credentials: true,
  },
});

global._io = io;

io.on("connection", (socket) => {
  // console.log("Connection: ", socket.id);

  socket.on("order-succeed", async (orderId) => {
    let message = await orderService.getOrderDetailService(orderId);

    if (message.errCode === 0) {
      socket.broadcast.emit("notify-order-succeed", message.data);
    } else {
      console.log(message.message);
    }
  });

  socket.on("cancel-order-succeed", async (orderId) => {
    socket.broadcast.emit("notify-cancel-order-succeed");
  });

  // socket.on("disconnect", () => {
  //   console.log("Disconnect: ", socket.id);
  // });
});

cron.schedule("59 23 * * *", async () => {
  const allProducts = await db.Product_Size.findAll({
    where: {
      quantity: { [Op.lt]: 20 },
    },
    include: [
      {
        model: db.Product,
        as: "ProductSizeData",
        attributes: ["name", "productId", "id"],
      },
      {
        model: db.Size,
        as: "SizeData",
        attributes: ["sizeName"],
      },
    ],
    raw: true,
    nest: true,
  });

  await Promise.all(
    allProducts.map(async (product) => {
      await notificationService.createNewNotificationService({
        type: "admin",
        message: `Sản phẩm ${product.ProductSizeData.name} với kích cỡ ${product.SizeData.sizeName} sắp hết tồn kho`,
        path: `/product/${product.ProductSizeData.id}/productsize/edit/${product.id}`,
      });
    })
  );
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log("Backend is running on port: " + port);
});
