import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`db connected on : ${conn.connection.host}`);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export { connectDb };
