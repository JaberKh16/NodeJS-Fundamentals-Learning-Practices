
const CategoryModel = require('../models/category.model');
const { ValidationError, UniqueConstraintError } = require('sequelize');


const handleNewEntry = async (req, res) => {
  try {
      const newCategory = await CategoryModel.create(req.body);
      if(newCategory){
        return res.status(201).json({ 
          sucess: true,
          message: 'Category entry successful',
          data: newCategory
        });
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
      return res.status(500).json({ message: 'Something went wrong.'});
  }
}

const handleListCategories = async(req, res) => {
  try {
    const listCategories = await CategoryModel.findAll(); // if found all list otherwise []
    return res.status(200).json({ 
      sucess: true,
      message: 'Data Fetched',
      data: listCategories 
    });
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
    return res.status(500).json({ message: 'Something went wrong.'});
  }
}

const handleSearchById = async(req, res) => {
  try {
    const fetchedCategory = await CategoryModel.findByPk(req.params.id);
    if(!fetchedCategory) {
      return res.status(204).json({
        sucess: false,
        message: 'Category id not found',
        data: []
      });
    }
    return res.status(200).json({
      sucess: true,
      message: 'Category id fetched',
      data: fetchedCategory
    });

  } catch(error) {
    console.error(JSON.stringify(error));
    console.log(error.constructor.name); // returns if any validation that error class name
   
    // handle the validation error
    if(error instanceof ValidationError) {
      return res.status(422).json({ 
        error: 'Validation Error', 
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ message: 'Something went wrong.'});
  }
}

const handleSearchByName = async(req, res) => {
  try {
    const name = req.query.name;
    
    // Validate input
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category name provided',
        data: []
      });
    }

    const fetchedCategory = await CategoryModel.findOne({ 
      name: name.trim()
    });
    
    if (!fetchedCategory) {
      return res.status(404).json({ 
        success: false,
        message: 'Category name not found',
        data: []
      });
    }
    
    return res.status(200).json({
      success: true, 
      message: 'Category name fetched',
      data: fetchedCategory
    });
    
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ 
        error: 'Validation Error', 
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ 
      success: false,
      message: 'Something went wrong.' 
    });
  }
}

const handleUpdateCategory = async(req, res) => {
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
    const [affectedRows, updatedCategory] = await CategoryModel.update({
      name: req.body.name
    }, {
      where: {
        id: id,
        returning: true // work on postgres and return the updated category
      }
    });
    if(affectedRows === 0){
      return res.status(204).json({ 
        sucess: false,
        message: 'Category not found'
      });
    }
    return res.status(200).json({ 
      sucess: true,
      message: 'Category id found',
      data: updatedCategory
    });

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
    return res.status(500).json({ message: 'Something went wrong.'});
  }
}

const handleDeleteCategory = async(req, res) => {
  try {
    // find the id
    const fetchedCategory = await CategoryModel.findByPk(req.params.id);
    if(!fetchedCategory){
      return res.status(204).json({ message: 'Category not found'});
    }
    // found perform the delete
    const affectedRows = await CategoryModel.destroy({
      where: {
        id: req.params.id
      }
    });
    if(affectedRows === 0){
      return res.status(204).json({ 
        sucess: false,
        message: 'Category deletion failed'
      });
    }
    return res.status(200).json({ 
      sucess: false,
      message: 'Category deleted.' 
    });
  } catch(error){
    return res.status(500).json({ message: 'Somethign went wrong.'})
  }
}



module.exports = {
  handleNewEntry,
  handleListCategories,
  handleSearchById,
  handleSearchByName,
  handleUpdateCategory,
  handleDeleteCategory
}
