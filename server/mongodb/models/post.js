import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postType: { type: String, required: true },
  location: { type: String, required: true },
  keywords: [{ type: String, required: true }],
  photo: { type: String, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const postModel = mongoose.model("Post", PostSchema);

export default postModel;
