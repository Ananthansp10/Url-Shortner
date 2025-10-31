import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL ?? "";
const connnectDb = async () => {
  try {
    mongoose.connect(mongoUrl).then(() => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log(error);
  }
};

export default connnectDb;
