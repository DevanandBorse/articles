const pool = require("../database");
const Pool = require("../database");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { category_name, parent_category, sub_category } = req.body;

      const category = await Pool.query(
        "INSERT INTO category(category_name,parent_category,sub_category) VALUES($1,$2,$3) RETURNING *",
        [category_name, parent_category, sub_category]
      );

      return res.status(200).json({
        status: "200",
        message: "success",
        Data: category.rows[0],
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await Pool.query("SELECT * FROM category");

      if (category.rows.length === 0) {
        return res.status(404).json({ message: "category not found" });
      }
      return res.status(200).json({
        status: "200",
        message: "success",
        Data: category.rows,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  searchCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Pool.query("SELECT * FROM  category WHERE id=$1", 
      [
        id,
      ]);

      if (category.rows.length === 0) {
        return res.status(404).json({ message: "Data not found" });
      }

      return res.status(200).json({
        status: "200",
        message: "success",
        Data: category.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  },

  updateCategoryById: async (req, res) => {
    try {
      const id = req.params.id;
      const { category_name, parent_category, sub_category } = req.body;

      const category = await Pool.query(
        "UPDATE category SET category_name=$1, parent_category=$2, sub_category=$3 WHERE id=$4 RETURNING *",
        [category_name, parent_category, sub_category,id]
      );
      if (category.rows.length === 0) {
        return res.status(404).json({ message: "category not found" });
      }
      return res.status(200).json({
        status: "200",
        message: "success",
        // Data: category.rows[0],
        data:({ message:'Category Updated successfully'})
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });    }
  },

  deleteCtaegoryById: async (req, res) => {
    try{
        const id =req.params.id;
        const category = await Pool.query(
            'DELETE FROM category WHERE id=$1 RETURNING *',[id]
        );
        if (category.rows.length === 0) {
            return res.status(404).json({ message: "category not found" });
          }
          return res.status(200).json({
            status: "200",
            message: "success",
            data:({ message:'Category deleted successfully'})

          });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
