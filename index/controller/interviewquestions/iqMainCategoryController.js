const MainCategoryModel = require("../../model/interviewquestions/iqMainCategoryModel");

const MainCategoryController = {
  createmaincategory: async (req, res) => {
    try {
      //Execute the query using established pool
      const maincategory = await MainCategoryModel.createmaincategory(
        req.body,
        res
      );

      if (maincategory.length === 0) {
        return res.status(404).json({ 
          response_code: 404,
          response_message: "Success",
          data: { message: "maincategory not found" }
        });
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: maincategory,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
  getmaincategory: async (req, res) => {
    try {
      const maincategory = await MainCategoryModel.getmaincategory();
      if (maincategory.length === 0) {
        return res.status(404).json({ 
          response_code: 404,
          response_message: "Success",
          data: { message: "category_name not found" }
        });
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: maincategory,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  updatemaincategoryById: async (req, res) => {
    try {
      var id = parseInt(req.params.id);
      var category_name = req.body.category_name;
      const maincategory = await MainCategoryModel.updatemaincategoryById(
        id,
        category_name
      );
      if (maincategory.length === 0) {
        return res.status(404).json({ 
          response_code: 404,
          response_message: "Success",
          data: { message: "Id not found" }
        });
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: "maincategory updated successfully" },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  deletemaincategoryById: async (req, res) => {
    try {
      var id = req.params.id;
      const maincategory = await MainCategoryModel.deletemaincategoryById(id);
      if (!maincategory) {
        return res.status(404).json({ 
          response_code: 404,
          response_message: "Success",
          data: { message: "Id not found" }
        });
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: "maincategory deleted successfully" }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = MainCategoryController;
