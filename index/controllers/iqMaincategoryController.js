const Pool = require("../database");
module.exports = {
  createmaincategory: async(req, res) => {
    try {
      const { category_name } = req.body;

      //Execute the query using established pool
      const maincategory = await Pool.query(
        "INSERT INTO interview_questions_main_category(category_name) VALUES($1) RETURNING *",
        [category_name]
      );

    return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: maincategory.rows[0],
    });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  // get interview question main category
  getmaincategory: async(req, res) => {
    try{
        const maincategory = await Pool.query(
            "SELECT id,category_name FROM interview_questions_main_category"
        );
        if(maincategory.rows.length === 0){
            return res
            .status(404)
            .json({message: "Interview questions of maincategory not found"});
        }
        res.status(200).json({
            response_code: 200,
            response_message: "Success",
            data: maincategory.rows
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
  },

  // get interview question maincategory by Id
  getmaincategoryById: async (req, res) => {
    try{
        const { id } = req.params;
        const maincategory = await Pool.query(
            "SELECT category_name FROM interview_questions_main_category WHERE id=$", [id]
        );

        if(maincategory.rows.length === 0){
            return res
                .status(404)
                .json({message: "Interview questions of main_category not found"})
        }
        res.json({
            response_code: 200,
            response_message: "Success",
            data: maincategory.rows[0]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
  },

  //update interview question main category by Id
  updatemaincategoryById: async (req, res) => {
    try{
        const { id } = req.params;
        const { category_name } = req.body;
        const maincategory = await Pool.query(
            "UPDATE interview_questions_main_category SET category_name=$1 WHERE id=$2 RETURNING *", [category_name, id]
        );

        if(maincategory.rows.length === 0) {
            return res.status(404).json({ message : "Id not found" });
        }
        return res.json({
            response_code: 200,
        response_message: "Success",
        data: maincategory.rows[0]
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // delete interview question main category by Id
  deletemaincategoryById: async (req, res) => {
    try{
        const { id } = req.params;
        const maincategory = await Pool.query(
            "DELETE FROM interview_questions_main_category WHERE id=$1 RETURNING *", [id]
        );

        if(!maincategory) {
            return res.status(404).json({ error: "Interview question of main category not found" });
        }
        res.json({ 
            response_code: 200,
            response_message: "Success" 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"});
    }
  }
};
