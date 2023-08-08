import express, { json } from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes/auth.js";
import categoryRoutes from "./routes/categoryRoutes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes/productRoutes.js";
import cors from "cors";

// express object
const app = express();

//config env
dotenv.config();

// database connection
connectDB();

//middelwares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// port
const PORT = process.env.PORT || 8080;

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest API
app.get("", (req, res) => {
  res.status(200).send({
    message: "successfully connect to backend",
  });
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`.bgCyan.white);
});
