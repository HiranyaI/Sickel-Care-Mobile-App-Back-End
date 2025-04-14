const Blog = require('../models/blog');

class BlogService{
    async createBlog(blogData){
        try {
            const blog = new Blog(blogData);
            return await blog.save();
        } catch (error) {
            throw new Error(`error when creating blog: ${error.message}`);
        }
    }
    async updateBlog(blogId, blogData){
        try {
            return await Blog.findOneAndUpdate(
                {blogId:blogId,isDeleted: false},
                {$set:blogData},
                {new: true}
            )
        } catch (error) {
            throw new Error(`error when updating blog: ${error.message}`);
        }
    }
    async getAllBlogs(){
        try {
            return await Blog.find({isDeleted:false});
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`);
        }
    }
    async getBlogByBlogId(blogId){
        try {
            return await Blog.findOne({blogId:blogId, isDeleted:false});
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`);
        }
    }
    async deleteBlog(blogId){
        try {
            return await Blog.findOneAndUpdate(
                {blogId:blogId, isDeleted:false},
                {$set:{isDeleted:true}},
                {new: true}
            )
        } catch (error) {
            throw new Error(`error when deleting blog: ${error.message}`)
        }
    }
}
module.exports = new BlogService();