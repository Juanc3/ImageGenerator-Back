import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
// import cron from "node-cron";

import PostSchema from "../database/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// async function cleanImages() {
//   try {
//     const AllPosts = await PostSchema.find().sort({ createdAt: 1 }).exec();

//     if (AllPosts.length > 15) {
//       for (let i = 0; i < 3; i++) {
//         const deletedImage = AllPosts[i];
//         await cloudinary.uploader.destroy(deletedImage.public_id);
//         await PostSchema.findByIdAndRemove(deletedImage._id);
//       }
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// cron.schedule("0 0 * * *", () => {
//   console.log("Cleaning Images...");
//   cleanImages();
// });

router.route("/").get(async (req, res) => {
  try {
    const posts = await PostSchema.find({});
    // await cleanImages();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await PostSchema.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

export default router;
