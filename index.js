import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import imagesRoutes from "./routes/imagesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3005;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.disable("x-powered-by");

app.use("/api/post", postRoutes);
app.use("/api/images", imagesRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
