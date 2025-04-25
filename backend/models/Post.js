const db = require("./db");

const Post = {
  async create({ title, content, cover_image, author_id }) {
    const [result] = await db.query(
      "INSERT INTO posts (title, content, cover_image, author_id) VALUES (?, ?, ?, ?)",
      [title, content, cover_image, author_id]
    );
    return { id: result.insertId, title, content, cover_image, author_id };
  },
  async findAllWithAuthor() {
    const [rows] = await db.query(
      `SELECT posts.*, users.name as author_name, users.email as author_email
       FROM posts JOIN users ON posts.author_id = users.id
       ORDER BY posts.created_at DESC`
    );
    return rows;
  },
  async findByIdWithAuthor(id) {
    const [rows] = await db.query(
      `SELECT posts.*, users.name as author_name, users.email as author_email
       FROM posts JOIN users ON posts.author_id = users.id
       WHERE posts.id = ?`,
      [id]
    );
    return rows[0];
  },
  async update(id, { title, content, cover_image }) {
    await db.query(
      "UPDATE posts SET title = ?, content = ?, cover_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [title, content, cover_image, id]
    );
  },
  async delete(id) {
    await db.query("DELETE FROM posts WHERE id = ?", [id]);
  },
};

module.exports = Post;
