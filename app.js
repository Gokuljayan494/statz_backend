const express = require("express");
const { default: mongoose } = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();

const qrCodeDir = path.join(__dirname, "./asset/qr");
if (!fs.existsSync(qrCodeDir)) {
  fs.mkdirSync(qrCodeDir, { recursive: true });
}

//router
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const categoryRouter = require("./router/categoryRouter");
const businessRouter = require("./router/businessRouter");

//middleware
app.use(express.json());
const allowedOrigins = [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("cors error"));
    }
  },
  credentials: true,
};

app.use(cors());

//routes
app.use("/user/", userRouter);
app.use("/product/", productRouter);
app.use("/category/", categoryRouter);
app.use("/business/", businessRouter);

mongoose
  .connect(
    "mongodb+srv://gokuljayan494:xsLhqbG116JvCQBq@cluster0.rijpeqf.mongodb.net/"
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen("5000", () => {
  console.log(`Server started at port 5000`);
});
