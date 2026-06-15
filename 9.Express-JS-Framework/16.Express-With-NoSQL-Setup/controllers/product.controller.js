const Product = require('../models/product.model');

const productController = {};

productController.handleProducts = async(req, res) => {
    try {
        const products = await Product.find();
        return res.json({
            status: 200,
            msg: 'Product fetched',
            data: products
        })
    } catch(err) {
        return res.status(500).json({
            status: 500,
            msg: err.message
        })
    }
}


productController.handleSpecficProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.json({
                status: 204,
                msg: 'Product id not found'
            });
        }
        return res.json({
            status: 200,
            msg: 'Product id found',
            data: product
        })
    } catch(err){
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}


productController.handleProductEntry = async(req, res) => {
    try {
        const { name, code, description, price, status, category } = req.body;

        if(!name || !code || !price || !category){
            return res.status(401).json({
                status: 401,
                msg: 'name, code, price, category are required.'
            });
        }

        const newProduct = await Product.create(req.body);
        if(newProduct){
            return res.status(201).json({
                status: 201,
                msg: 'Product new entry successful.'
            })
        }
    } catch(err){
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}

productController.handleUpdateProduct = async(req, res) => {
    try {
        const fetchedProduct = await Product.findById(req.params.id);
        if(!fetchedProduct) {
            return res.status(204).json({
                status: 204,
                msg: 'Product id not found.'
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if(!updatedProduct){
            return res.status(204).json({ 
                status: 204,
                msg: 'Product id not found' 
            });
        }
        return res.status(200).json({
            status: 200,
            msg: 'Product id updated.',
            data: updatedProduct
        })

    } catch(err) {
        return res.status(500).json({
            status: 500,
            msg: err.message
        })
    }
}

productController.handleDeleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(401).json({
                status: 401,
                msg: 'Product id is required'
            });
        }
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(204).json({
                status: 204,
                msg: 'Product id not found to delete'
            });
        }
    } catch(err) {
        return res.status(50).json({
            status: 500,
            msg: err.message
        });
    }
}

module.exports = productController;