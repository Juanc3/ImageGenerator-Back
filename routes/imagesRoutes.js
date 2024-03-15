import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

const ImageGenerator =
  "https://random.imagecdn.app/v1/image?width=1920&height=1080";

router.route("/").get(async (req, res) => {
  try {
    const response = await axios.get(ImageGenerator);
    const url = response.data;
    res.status(200).json({ image: url });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response?.data?.error?.message || "Something went wrong");
  }
});

export default router;
