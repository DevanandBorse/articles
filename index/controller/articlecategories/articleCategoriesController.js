
const ArticleCategoriesModel = require('../../model/articlcategories/articleCategoriesModel');



const ArticleCategoriesController = {

  createCategories: async(req,res)=>{
    try {
      const { title, parent_category, status } = req.body;
      const image_url = req.file.path; // Assuming you're using multer for image upload
      console.log(image_url);

      const categories = await ArticleCategoriesModel.createCategories(title, image_url, parent_category, status);
  
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: categories,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getAllCategories : async (req, res) => {
  try {
    const categories = await ArticleCategoriesModel.getAllCategories();

  if (categories.length === 0) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.status(200).json({
    response_code: 200,
    response_message: "Success",
    data: categories,
  });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Server Error");
}
  },
  searchCategoriesById : async (req, res) => {
    try {
      const { id } = req.params;
      const categories = await ArticleCategoriesModel.searchCategoriesById(id);
  
      if (!categories) {
        return res.status(404).json({ message: "Data not found" });
      }
  
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: categories,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  updateCategoriesById : async(req,res)=>{
    try {
      const id = req.params.id;
      const { title, image_url, parent_category, status } = req.body;
  
      const categories = await ArticleCategoriesModel.updateCategoryById(id, title, image_url, parent_category, status);
  
      if (!categories) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: 'Category updated successfully' },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteCategoriesById : async (req, res) => {
    try {
      const id = req.params.id;
      const categories = await ArticleCategoriesModel.deleteCategoriesById(id);
  
      if (!categories) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: 'Category deleted successfully' },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};


module.exports = ArticleCategoriesController;

