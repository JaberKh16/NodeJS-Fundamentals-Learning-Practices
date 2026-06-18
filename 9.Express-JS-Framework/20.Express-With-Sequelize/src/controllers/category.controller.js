
const CategoryModel = require('../models/category.model');
const { ValidationError, UniqueConstraintError } = require('sequelize');


const createCategory = async (req, res) => {
  try {
      const newCategory = await CategoryModel.create(req.body);
      if(newCategory){
        return res.status(201).json({ data: newCategory});
      }
  } catch(error){
      console.error(JSON.stringify(error));
      console.log(error.constructor.name); // returns if any validation that error class name

      // handle the unique constraint error
      if(error instanceof UniqueConstraintError){
        return res.status(409).json({
          error: 'Validation Error',
          details: {
            field: error.errors[0].path,
            message: error.errors[0].message
          }
        })
      }
      // handle the validation error
      if(error instanceof ValidationError) {
        return res.status(422).json({ 
          error: 'Validation Error', 
          details: error.errors.map(e => ({ field: e.path, message: e.message }))
        });
      }
      return res.status(500).json({ msg: 'Something went wrong.'});
  }
}

const listCategories = async(req, res) => {
  try {
    const listCategories = await CategoryModel.findAll(); // if found all list otherwise []
    return res.status(200).json({ data: listCategories });
  } catch(error) {
    console.error(JSON.stringify(error));
    console.log(error.constructor.name); // returns if any validation that error class name
    // handle the unique constraint error
    if(error instanceof UniqueConstraintError){
      return res.status(409).json({
        error: 'Validation Error',
        details: {
          field: error.errors[0].path,
          message: error.errors[0].message
        }
      })
    }
    // handle the validation error
    if(error instanceof ValidationError) {
      return res.status(422).json({ 
        error: 'Validation Error', 
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ msg: 'Something went wrong.'});
  }
}

const getCategory = async(req, res) => {
  try {
    const { id } = req.params;

  } catch(error) {
    console.error(JSON.stringify(error));
    console.log(error.constructor.name); // returns if any validation that error class name
    // handle the unique constraint error
    if(error instanceof UniqueConstraintError){
      return res.status(409).json({
        error: 'Validation Error',
        details: {
          field: error.errors[0].path,
          message: error.errors[0].message
        }
      })
    }
    // handle the validation error
    if(error instanceof ValidationError) {
      return res.status(422).json({ 
        error: 'Validation Error', 
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ msg: 'Something went wrong.'});
  }
}

const updateCategory = async(req, res) => {
  try {
    const { id } = req.params;
    // const updatedCategory = await CategoryModel.update({
    //   name: req.body.name
    // }, {
    //   where: {
    //     id: id,
    //     returning: true // work on postgres and return the updated category
    //   }
    // });
    // console.log(JSON.stringify(updatedCategory));
    //
    const [updatedRows, updatedCategory] = await CategoryModel.update({
      name: req.body.name
    }, {
      where: {
        id: id,
        returning: true // work on postgres and return the updated category
      }
    });
    if(updatedRows === 0){
      return res.status(204).json({ msg: 'Category not found'});
    }
    return res.status(200).json({ data: updatedCategory});

  } catch(error) {
    console.error(JSON.stringify(error));
    console.log(error.constructor.name); // returns if any validation that error class name
    // handle the unique constraint error
    if(error instanceof UniqueConstraintError){
      return res.status(409).json({
        error: 'Validation Error',
        details: {
          field: error.errors[0].path,
          message: error.errors[0].message
        }
      })
    }
    // handle the validation error
    if(error instanceof ValidationError) {
      return res.status(422).json({ 
        error: 'Validation Error', 
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ msg: 'Something went wrong.'});
  }
}

const deleteCategory = async(req, res) => {
  try {
    // find the id
    const fetchedPassedCategory = await CategoryModel.findByPk(req.params.id);
    if(!fetchedPassedCategory){
      return res.status(204).json({ msg: 'Category not found'});
    }
    // found perform the delete
    const deletedRows = await CategoryModel.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deletedRows === 0){
      return res.status(204).json({ msg: 'Category updation failed'});
    }
    return res.status(200).json({ msg: 'Category deleted.' });
  } catch(error){
    return res.status(500).json({ msg: 'Somethign went wrong.'})
  }
}




module.exports = {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
  deleteCategory
}
