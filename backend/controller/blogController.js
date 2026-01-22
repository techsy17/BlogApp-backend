import Blogs from "../models/blogModel.js";

// const addBlog = async (req, res) => {
//     try {
//         const { title, body, author } = req.body;
//         const addBlog = await Blogs.create({ title, body, author });
//         if (!addBlog) {
//             return res.status(400).json({ message: "Blog not created, Something went wrong!" })
//         }
//         res.status(200).json({ message: "Blog Added Successfully", addBlog });

//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
//     }
// };


// All Blogs  
const addBlog = async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: "Unauhtorized, Please Login First!" })
        }
        const addBlog = await Blogs.create({ title, body, author: req.user.username, userId: req.user.id });
        if (!addBlog) {
            return res.status(400).json({ message: "Blog not created, Something went wrong!" })
        }
        res.status(200).json({ message: "Blog Added Successfully", addBlog, user: req.user });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
};


const getAllBlogs = async (req, res) => {
    try {
        const getAllBlogs = await Blogs.find();
        if (!getAllBlogs) {
            return res.status(400).json({ message: "No blogs Found, please add some blogs!" });
        }
        res.status(200).json(getAllBlogs);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
};

const getBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const getBlog = await Blogs.findById(blogId);
        if (!blogId) {
            return res.status(400).json({ message: "Blog not found with these ID.." });
        }
        res.status(200).json(getBlog);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const deleteBlog = await Blogs.findByIdAndDelete(blogId);
        if (!deleteBlog) {
            return res.status(400).json({ message: "Blog is not deleted,Please try again!" });
        }
        res.status(200).json({ message: "Blog Deleted Successfully", deleteBlog });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const data = req.body;
        const blogId = req.params.id;
        const updateBlog = await Blogs.findByIdAndUpdate(blogId, data);
        if (!updateBlog) {
            return res.status(400).json({ message: "Blog not Updated, Please try again!" });
        }
        res.status(200).json({ message: "Blog Updated Successfully", updateBlog });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
}


// My Blogs 
const getMyBlogs = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log(userId);

        const getMyBlog = await Blogs.find({ userId });
        if (!getMyBlog) {
            return res.status(400).json({ message: "Blog not found with these USER ID.." });
        }
        res.status(200).json({ UserBlogs: getMyBlog });
        //  res.status(200).json(getMyBlog);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
}


const getMyBlog = async (req, res) => {

    try {
        const blogId = req.params.id
        const getMyBlog = await Blogs.findById(blogId);
        if (!blogId) {
            return res.status(400).json({ message: "Blog not found with these ID.." });
        }
        res.status(200).json(getMyBlog);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
}


const deleteMyBlog = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);

        const deleteMyBlog = await Blogs.findByIdAndDelete(id);
        if (!deleteMyBlog) {
            return res.status(400).json({ message: "Blog not found with these ID.." });
        }
        res.status(200).json({ message: "Blog Deleted Successfully", deleteMyBlog });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
}


const updateMyBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updateMyBlog = await Blogs.findByIdAndUpdate(id, data);
        if (!updateMyBlog) {
            return res.status(400).json({ message: "Blog not Updated, Please try again!" });
        }
        res.status(200).json({ message: "Blog Updated Successfully", updateMyBlog });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again!!", error: error.message });
    }
}


export { addBlog, getAllBlogs, getBlog, deleteBlog, updateBlog, getMyBlogs, getMyBlog, deleteMyBlog, updateMyBlog };