const blog = require("../models/blogModel");


exports.createBlog = async (req, res) => {
    try {
        const {user_id, image,firebaseImageUrl,title, body, author } = req.body;
        const response = await blog.create({user_id, image,firebaseImageUrl, title, body, author });
        res.status(200).json(
            {
                success: true,
                data: response,
                message: 'blog Created Successfully'
            }
        );
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: "internal server error",
                message: err.message,
            })
    }
}

// get blog

exports.getBlog = async (req, res) => {
    try {
        const blogs = await blog.find({});

        //response
        res.status(200)
            .json({
                success: true,
                data: blogs,
                message: "Entire Todo Data is fetched",
            });
        // console.log("imin get backend");
    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: 'Server Error',
            });

    }
}


exports. getBlogByid = async (req, res) => {
    try {
        //extract todo items basis on id
        const id = req.params.id;
        const blogs = await blog.find({ user_id: id })
        return res.status(200).json({
            success: true,
            data: blogs,
            message: `blogs successfully fetched`,
        })

    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: 'Server Error',
            });

    }
}

// update blog

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, body, author } = req.body;

        const blogs = await blog.findByIdAndUpdate(
            { _id: id },
            { image, title, body, author },
        )

        res.status(200).json({
            success: true,
            data: blogs,
            message: `Updated Successfully`,
        })

    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: 'Server Error',
            });
    }
}


exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        await blog.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "blog DELETED",
        })

    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: 'Server Error',
            });
    }
}


