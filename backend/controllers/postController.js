const Post = require("../models/Post");

exports.create = async (req, res) => {
  const { title, content } = req.body;
  const cover_image = req.file ? req.file.filename : null;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content required" });
  try {
    const post = await Post.create({
      title,
      content,
      cover_image,
      author_id: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err); // Log error
    res.status(500).json({ message: "Failed to create post" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAllWithAuthor();
    res.json(posts);
  } catch (err) {
    console.error("Get all posts error:", err); // Log error
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Post.findByIdWithAuthor(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Get single post error:", err); // Log error
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

exports.update = async (req, res) => {
  const { title, content } = req.body;
  const cover_image = req.file ? req.file.filename : req.body.cover_image;
  try {
    await Post.update(req.params.id, { title, content, cover_image });
    res.json({ message: "Post updated" });
  } catch (err) {
    console.error("Update post error:", err); // Log error
    res.status(500).json({ message: "Failed to update post" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Post.delete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete post error:", err); // Log error
    res.status(500).json({ message: "Failed to delete post" });
  }
};
