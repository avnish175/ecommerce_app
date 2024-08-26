import express from "express";
import dotenv from "dotenv"; //npm i dotenv   to use .env
import morgan from "morgan"; // npm i morgan
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
//npm i bcrypt   to hach password to encrypt
//npm i jsonwebtoken
// npm i concurrently    it start both npm start and nodemon server.js once see package.json file
// npm i cors
//npm i express-formidable  used in photo
import cors from "cors";
import Razorpay from "razorpay"; //npm i razorpay
import path from "path";

dotenv.config();
const app = express();
connectDB();

const __dirname = path.resolve(); // If using ES6 modules, you need to resolve __dirname
app.use(express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

app.use(cors());
app.use(express.json()); // we can also use body parser
app.use(morgan("dev"));

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome </h1>");
});

//razorpay
app.get("/api/v1/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${process.env.DEV_MODE} mode  on  ${PORT}`);
});
