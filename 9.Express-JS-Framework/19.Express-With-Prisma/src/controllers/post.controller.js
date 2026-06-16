import { prisma } from '../config/db.js';

export const handleListFetch = async(req, res) => {
    try {
        const blogLists = await prisma.posts.findMany();
        if(blogLists) {
            return res.status(200).json({
                status: 200,
                success: true, 
                msg: 'Post list fetched',
                data: blogLists
            });
        }
    } catch(error) {
        return res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
}

export const handleNewEntry = async(req, res) => {
    try {
        const newEntry = await prisma.posts.create({
            data: {
                title: req.body.title,
                author: req.body.author,
                type: req.body.author,
                no_of_comments: req.body.no_of_comments,
                status: req.body.status
            }
        });
        return res.status(201).json({
            status: 201,
            success: true,
            msg: 'Post has been created',
            data: newEntry
        });
    } catch(error){
        return res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
}


export const handleSearchById = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const fetchedPost = await prisma.posts.findUnique({
            where: { id }
        });
        if(!fetchedPost) {
            return res.status(204).json({
                status: 204,
                success: false,
                msg: 'Post id not found',
                data: []
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            msg: 'Post id found',
            data: fetchedPost
        });
    } catch(error){
        return res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
}


export const handleUpdateById = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedPost = await prisma.posts.update({
            where: { id },
            data: {
                title: req.body.title,
                author: req.body.author,
                type: req.body.author,
                no_of_comments: req.body.no_of_comments,
                status: req.body.status
            }
        });
        return res.status(200).json({
            status: 200,
            success: true,
            msg: 'Post id updated',
            data: updatedPost
        });

    } catch(error){
        return res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
}


export const handleDeleteById = async(req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.posts.delete({
            where: { id }
        });

        return res.status(200).json({
            status: 200,
            success: true,
            msg: 'Post id deleted',
        });
    } catch(error){
        return res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
}