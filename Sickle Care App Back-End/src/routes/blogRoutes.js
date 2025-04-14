const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controllers/blogController');

blogRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'blogs service' });
});

blogRouter.post('/', blogController.createBlog);

blogRouter.get('/find/blogId', blogController.getBlogByBlogId);
blogRouter.get('/findall', blogController.getAllBlogs);

blogRouter.put('/update/blogId', blogController.updateBlog);

blogRouter.delete('/delete/blogId', blogController.deleteBlog);

module.exports = blogRouter;