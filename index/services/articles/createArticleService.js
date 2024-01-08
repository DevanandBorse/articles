
const Pool = require("../../../database"); // Assuming you have a separate file for database configuration

const ArticleServices = {
  createArticle: async (articleData) => {
    const {
      title,
      author,
      content,
      category,
      subcategory,
      tags,
      status,
      created_on,
      uid,
    } = articleData;

    try{
      return await Pool.query(
        "INSERT INTO articles(title,author,content,category,subcategory,tags,status,created_on,uid) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [
          title,
          author,
          content,
          category,
          subcategory,
          tags,
          status,
          created_on,
          uid,
        ]
      );
  
     // return article.rows[0];
    }catch (error) {
         console.error(error.message);

    }
  },

  // insertArticleImages:async(articleId,imagePath,status) => {

  //   // const articleImages = await Pool.query(
  //   //    `Insert into images (article_id,path,status) values ($1,$2,$3)`,
  //   //    [articleInsertedId,path,status]
  //   // );
  //   // return articleImages;

  //   return await Pool.query(
  //     `Insert into images (article_id,path,status) values ($1,$2,$3)`,
  //         [articleId,imagePath,status]
  //   );
  // },

  // createArticleService.js

  insertArticleImages: async (articleId, imagePath, status) => {
    try{
      return await Pool.query(
        `Insert into images (article_id,path,status) values ($1,$2,$3)`,
        [articleId, imagePath, status]
      );
      // return articleImages;
    }catch (error) {
         console.error(error.message);

    }
   
  },

  getArticlesByPagination: async (offset, limit) => {
    try{
      return await Pool.query(
        `SELECT a.id,a.title,a.author,a.category,a.subcategory,a.tags,a.status,
        (SELECT c.title FROM article_categories as c WHERE c.id = a.category) as category,
        (SELECT c.title FROM article_categories as c WHERE c.id = a.subcategory) as subcategory,a.created_on 
        FROM articles as a WHERE a.status = 1 ORDER BY id OFFSET $1 LIMIT $2 `,
        [offset, limit]
      );
    }catch (error) {
         console.error(error.message);

    }
    
  },

  getAllArticles: async () => {
    try{
      return await Pool.query(
        `SELECT id, title, author, content, category, subcategory, tags, status, created_on, uid FROM articles WHERE status = 1`
      );
    }catch (error) {
         console.error(error.message);

    }
    
  },

  updateArticleById: async (
    title,
    author,
    content,
    category,
    subcategory,
    tags,
    created_on,
    id
  ) => {
    try {
      return await Pool.query(
        "UPDATE articles SET title=$1, author=$2, content=$3, category=$4, subcategory=$5, tags=$6, created_on=$7 WHERE id=$8 RETURNING id",
        [title, author, content, category, subcategory, tags, created_on, id]
      );
     // return article.rows[0];
    } catch (error) {
    console.error(error.message);
    }
  },

  deleteArticleById: async (id) => {
    const status = 1;

    try {

      return await Pool.query(
        'UPDATE articles SET status = 0 WHERE "id" = $1 AND status = 1',
        [id]
      );
      //return article.rows[0];
    } catch (error) {
    console.error(error.message);
    }
  },

  getArticleById: async (id) => {
    try {
      const status = 1;

      return await Pool.query(
       // "SELECT id, title, author, content, category, subcategory, tags, status, created_on, uid FROM articles WHERE id=$1 AND status=1",
       `SELECT a.id,a.title,a.author,a.category,a.subcategory,a.tags,a.status,
    (SELECT c.title FROM article_categories as c WHERE c.id = a.category) as category,
    (SELECT c.title FROM article_categories as c WHERE c.id = a.subcategory) as subcategory,
    a.created_on,a.uid,
    i.path as image_path
  FROM 
    articles as a 
  LEFT JOIN
    images as i ON a.id = i.article_id AND i.status = $1
  WHERE 
    a.id = $2 AND a.status = $3;
  `,
  [status, id, status]
      );
      //return article.rows;
    } catch (error) {
    console.error(error.message);
    }
  },

  // searchArticleByTitle: async (title) => {
  //   try {
  //     var status=1;
  //    // var images='';

  //     const articleResult = await Pool.query(
  //       `SELECT a.id, a.title, a.author, a.content, a.category, a.subcategory, a.tags, a.status, (SELECT c.title FROM article_categories as c WHERE c.id = a.category) as category, (SELECT c.title FROM article_categories as c WHERE c.id = a.subcategory) as subcategory,a.created_on FROM articles as a  WHERE a.status = 1 ${title}`,

  //     );
  //     if (articleResult.rows.length === 0) {
  //       console.log("Article not found.");
  //       return null; // or handle accordingly
  //     }

  //     const article = articleResult.rows[0];
  //     const articleId = article.id;

  //     //var id = article.rows[0].id;
  //     const imagesResult = await Pool.query(
  //       `SELECT a.path as path FROM images as a WHERE a.article_id = $1 AND a.status = $2 `,
  //       [articleId,status]
  //     );

  //     if(imagesResult.rows.length===0){
  //       console.log("Images not found..");
  //     }else {
  //       article.images = imagesResult.rows;

  //        // images = imagesResult.rows;

  //     }

  //     return article.rows[0].images = images;

  //    //return article.rows;
  //   //return [article];

  //   } catch (error) {
  //     throw new Error('Error searching for articles by title');
  //   }
  // },

  searchArticleByTitleWithImages: async (title) => {
    try {
      const status = 1;
      return await Pool.query(
        `SELECT a.id,a.title,a.author,a.content,a.category, a.subcategory, a.tags, a.status,
        (SELECT c.title FROM article_categories as c WHERE c.id = a.category) as category,
        (SELECT c.title FROM article_categories as c WHERE c.id = a.subcategory) as subcategory,
        a.created_on,
        i.path as image_path
      FROM
        articles as a
      LEFT JOIN
        images as i ON a.id = i.article_id AND i.status = $1
      WHERE
            a.status = $2 AND a.title LIKE $3`,
        [status, status, `%${title}%`]
      );

      //return result.rows;
    } catch (error) {
      console.error("Error searching for articles with images:", error.message);
      //throw new Error("Error searching for articles with images");
    }
  },

  getMainCategory: async () => {
    try {
    return await Pool.query(
        "SELECT id, title, image_url FROM article_categories WHERE parent_category IS NULL AND status = 1"
      );
      //return mainCategories.rows;
    } catch (error) {
    console.error(error.message);
   		
    }
  },

  getSubCategory: async (id,res) => {
    try {
      return await Pool.query(
        "SELECT id, title, image_url FROM article_categories WHERE parent_category=$1 AND status = 1",
        [id]
      );
     // return categories.rows;
    } catch (error) {
    console.error(error.message);
      
    }
  },
};

module.exports = ArticleServices;
