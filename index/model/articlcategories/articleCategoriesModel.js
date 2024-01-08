const ArticleCategoriesService = require('../../services/articlcategories/articleCategoriesService');

const ArticleCategoriesModel={
  createCategories : async(title, image_url, parent_category, status)=>{

    try{
      const categories = await ArticleCategoriesService.createCategories(title, image_url, parent_category, status);
      return categories.rows[0];
    } catch (error) {
      console.error(error.message);
    }
  },

  getAllCategories : async () => {
  try {
    const categories = await ArticleCategoriesService.getAllCategories();
   // console.log(categories.rows);
    return categories.rows;
  } catch (error) {
    console.error(error.message);
  }
},

searchCategoriesById : async(id)=>{
try{
  const categories = await ArticleCategoriesService.searchCategoriesById(id);
  return categories.rows[0];

}catch (error) {
    console.error(error.message);
  }

},

updateCategoryById : async(id, title, image_url, parent_category, status)=>{
  try{
    const categories = await ArticleCategoriesService.updateCategoryById(id, title, image_url, parent_category, status);
  return categories.rows[0];
  }catch (error) {
    console.error(error.message);
  }
},

deleteCategoriesById : async(id)=>{
  try{
    const categories = await ArticleCategoriesService.deleteCategoriesById(id);
  return categories.rows[0];
  }catch (error) {
    console.error(error.message);
  }
}

};
module.exports =  ArticleCategoriesModel;
