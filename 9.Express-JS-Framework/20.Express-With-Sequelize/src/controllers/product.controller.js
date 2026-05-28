const ProductModel = require('../models/products.model');
const { ValidationError, UniqueConstraintError } = require('sequelize');


const createProduct = async(req, res)=> {
    try{
        const newProduct = await ProductModel.create(req.body);
        if(newProduct){
            return res.status(201).json({
                data: newProduct
            })
        }
    } catch(error) {
        console.error(JSON.stringify(error));
        console.log(error.constraint.name); // get the validation error name 
        if(error instanceof ValidationError){
            return res.status(422).json({
                error: 'Validation Error',
                details: {
                    field: error.errors[0].path,
                    message: error.errors[0].message 
                }

            })
        }
        if(error instanceof UniqueConstraintError){
            return res.status(409).json({
                error: 'Validation Error',
                details: error.errors.map(e => {
                    field: e.path,
                    message: e.message
                });
            });
        }

        return res.status(500).json({
            status: 200, 
            message: 'Something went wrong'
        })

    }
}

function listProducts = async (req, res) => {
    try {
        const listProducts = await ProductModel.find();
        if(!listProducts){
            return res.status(200).json({
                message: 'No products found'
            })
        }
        return res.status(200).json({ message: 'Data found', data: listProducts});
    } catch(error) {
        console.error(JSON.stringify(error));
        console.log(error.constructor.name); // returns if any validation that error class name
        return res.status(500).json({ msg: 'Something went wrong.'});
    }
}

const getProduct = async (req, res) => {
    try {
        // find using primary key
        const product = await ProductModel.findByPk(req,params.id);
        if(product) {
            return res.status(200).json({ data: product });
        } else {
            return res.status(404).json({ msg: 'Product not found.'});
        }
    } catch(error) {
        console.error(JSON.stringify(error));
        console.log(error.constructor.name); // returns if any validation that error class name
        return res.status(500).json({ msg: 'Something went wrong.'});
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const fetchProduct = await ProductModel.findByPk(id);
        if(!fetchProduct) {
            return res.status(404).json({ msg: 'Product not found.'});
        }
        const updatedProduct = await fetchProduct.update(req.body);
        return res.status(200).json({ data: updatedProduct });
    } catch(error) {
        console.error(JSON.stringify(error));
        console.log(error.constructor.name); // returns if any validation that error class name

        if(error instanceof ValidationError){
            return res.status(422).json({
                error: 'Validation Error',
                details: {
                    field: error.errors[0].path,
                    message: error.errors[0].message 
                }

            })
        }
        if(error instanceof UniqueConstraintError){
            return res.status(409).json({
                error: 'Validation Error',
                details: error.errors.map(e => {
                    field: e.path,
                    message: e.message
                });
            });
        }

        return res.status(500).json({
            status: 200, 
            message: 'Something went wrong'
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const fetchProduct = await ProductModel.findByPk(req.params.id);
        if(!fetchProduct){
            return res.status(404).json({ msg: 'Product not found'});
        }
        // perform delete operation
        const deletedProduct = await fetchProduct.delete(fetchProduct);
        return res.status(200).send()
    } catch(error) {
        console.error(JSON.stringify(error));
        console.log(error.constructor.name); // returns if any validation that error class name
        return res.status(500).json({ msg: 'Something went wrong.'});
    }
}

module.exports = {
    createProduct,
    listProducts,
    getProduct,
    updateProduct,
    deleteProduct
}