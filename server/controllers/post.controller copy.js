import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllPosts = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        postType = "",
    } = req.query;

    const query = {};

    if (postType !== "") {
        query.postType = postType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await Post.countDocuments({ query });

        const posts = await Post.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate("creator");
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const {
            title,
            description,
            postType,
            location,
            keywords,
            photo,
            creator,
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findById(creator).session(session);

        if (!user) throw new Error("User not found");

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            title,
            description,
            postType,
            location,
            keywords,
            photo: photoUrl.url,
            creator: user._id,
        });

        user.allPosts.push(newPost._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, postType, location, keywords, photo } =
            req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Post.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                postType,
                location,
                keywords,
                photo: photoUrl.url || photo,
            },
            { new: true }
        );

        res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const postToDelete = await Post.findById({ _id: id }).populate(
            "creator",
        );

        if (!postToDelete) throw new Error("Post not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        postToDelete.remove({ session });
        postToDelete.creator.allPosts.pull(postToDelete);

        await postToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllPosts,
    getPostDetail,
    createPost,
    updatePost,
    deletePost,
};
