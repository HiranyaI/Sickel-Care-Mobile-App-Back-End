const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    abstract: {
        type: String,
        required: true,
        trim: true
    },
    sections: [
        {
            subtitle: {
                type: String,
                required: true,
                trim: true
            },
            content: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    isDeleted:{
        type: Boolean,
        default: false,
    }
},
{
timestamps: true

});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
