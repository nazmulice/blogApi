const express = require("express");
const router = express.Router();
const BlogPost = require("../../models/blogPost");

// GET all blog posts
router.get("/", (req, res) => {
  BlogPost.find()
    .then((blogPosts) => {
      res.json(blogPosts);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// GET a specific blog post by ID
router.get("/:id", (req, res) => {
  BlogPost.findById(req.params.id)
    .then((blogPost) => {
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// POST a new blog post
router.post("/", (req, res) => {
  const { title, author, content, date } = req.body;
  const newBlogPost = new BlogPost({ title, author, content, date });

  newBlogPost
    .save()
    .then((blogPost) => {
      res.json(blogPost);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// PUT (update) an existing blog post
router.put("/:id", (req, res) => {
  const { title, author, content, date } = req.body;

  BlogPost.findByIdAndUpdate(
    req.params.id,
    { title, author, content, date },
    { new: true }
  )
    .then((blogPost) => {
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// DELETE a blog post
router.delete("/:id", (req, res) => {
  BlogPost.findByIdAndRemove(req.params.id)
    .then((blogPost) => {
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ message: "Blog post deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = router;
