const blogService = require('../services/blogService');
const idGenerator = require('../utils/uniqueIdGenerator');

class BlogController {
    async createBlog(req, res){
        try {
            req.body.blogId = await idGenerator("BLOG-");
            const blog = await blogService.createBlog(req.body);
            return res.status(200).json(blog)
        } catch (error) {
            res.status(500).json({"error":error.message})
        }
    }
    async updateBlog(req, res){
        try {
            const {blogId} = req.query;
            const updatedBlog = await blogService.updateBlog(blogId, req.body);
            return res.status(200).json(updatedBlog);
        } catch (error) {
            return res.status(200).json({"error":error.message});
        }
    }
    async getAllBlogs(req, res){
        try {
            const blogs = await blogService.getAllBlogs();
            return res.status(200).json(blogs);
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
    async getBlogByBlogId(req, res){
        try {
            const {blogId}= req.query;
            const blog = await blogService.getBlogByBlogId(blogId);
            return res.status(200).json(blog)
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
    async deleteBlog(req, res){
        try {
            const {blogId} = req.query;
            const deletedBlog = await blogService.deleteBlog(blogId);
            return res.status(200).json(deletedBlog);
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
}

module.exports = new BlogController();