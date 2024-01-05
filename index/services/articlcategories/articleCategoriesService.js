// categoryModel.js
const Pool = require('../../../database');

const ArticleCategoriesService={

  
  createCategories : async (title, image_url, parent_category, status) => {
    try {
      return await Pool.query(
        `INSERT INTO article_categories(title, image_url, parent_category, status) VALUES($1, $2, $3, $4) RETURNING *`,
        [title, image_url, parent_category, status]
      );
     
    } catch (error) {
      console.error(error.message);
    }
  },
  
 getAllCategories : async () => {
  try{
   
    return await Pool.query(`select id,title,image_url,parent_category from article_categories where status = 1`);


  }catch (error) {
    console.error(error.message);
  }
},

searchCategoriesById : async(id)=>{
  try{
    const status=1
    return await Pool.query(`SELECT id, title, image_url, parent_category, status FROM article_categories WHERE id = $1 AND status = $2`,
    [id,status]
    );

    
  }catch (error) {
    console.error(error.message);
  }
},

updateCategoryById : async (id, title, image_url, parent_category, status) => {
  try {
   return await Pool.query(
      "UPDATE article_categories SET title=$1, image_url=$2, parent_category=$3, status=$4 WHERE id=$5 RETURNING id",
      [title, image_url, parent_category, status, id]
    );
  }catch (error) {
    console.error(error.message);
  }
},

deleteCategoriesById : async(id)=>{
try {
  return await Pool.query(
    'DELETE FROM article_categories WHERE id=$1 RETURNING id',
    [id]
  );
  }catch (error) {
    console.error(error.message);
  }
}
};

module.exports =  ArticleCategoriesService;
