const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *         cover_image:
 *           type: string
 *           description: The filename of the post's cover image
 *         author_id:
 *           type: integer
 *           description: The ID of the post's author
 *         author_name:
 *           type: string
 *           description: The name of the post's author
 *         author_email:
 *           type: string
 *           description: The email of the post's author
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the post was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the post was last updated
 *       example:
 *         id: 1
 *         title: Introduction to REST APIs
 *         content: This is a blog post about REST APIs and how they work.
 *         cover_image: 1745551184984-rest-api.png
 *         author_id: 1
 *         author_name: Ankit Sharma
 *         author_email: ankitsharma0318@gmail.com
 *         created_at: 2025-04-25T00:00:00.000Z
 *         updated_at: 2025-04-25T00:00:00.000Z
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog post
 *               content:
 *                 type: string
 *                 description: The content of the blog post
 *               cover_image:
 *                 type: string
 *                 format: binary
 *                 description: The cover image for the blog post
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */
router.post("/", auth, upload.single("cover_image"), postController.create);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */
router.get("/", postController.getAll);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog post
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/:id", postController.getOne);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the post
 *               content:
 *                 type: string
 *                 description: The updated content of the post
 *               cover_image:
 *                 type: string
 *                 format: binary
 *                 description: The updated cover image for the post
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */
router.put("/:id", auth, upload.single("cover_image"), postController.update);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the blog post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, postController.remove);

module.exports = router;
