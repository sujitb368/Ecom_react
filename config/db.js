import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

// connect mongodb
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`successfully connected to Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`something wrong ${error}.`.bgRed.white);
  }
};

export default connectDB;
