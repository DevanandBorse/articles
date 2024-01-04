const SubCategoryModel = require('../../model/interviewquestions/iqSubCategoryModel');
const SubCategoryController = {
    createSubCategory : async (req, res) => {
        try {
            const {
                category_name,
                parent_category
            } = req.body;
            const subcategory = await SubCategoryModel.createSubCategory(category_name, parent_category);
            
            res.status(200).json({
                response_code: 200,
                response_message: "Success",
                data: subcategory
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }      
    },

    getSubCategory: async(req, res) => {
        try {
            const subcategory = await SubCategoryModel.getSubCategory();
            if(subcategory.length === 0){
                return res.status(404).json( {response_message: "No subcategory found"} );
            }
            res.status(200).json({
                response_code: 200,
                response_message: "Success",
                data: subcategory
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },

    updateSubCategoryById: async (req, res) => {
        try {
            const {
                category_name,
                parent_category
            } = req.body;
            var id = parseInt(req.params.id);
            const subcategory = await SubCategoryModel.updateSubCategoryById(category_name, parent_category, id);
            if(subcategory.length === 0){
                return res.status(404).json({ response_message: "Id not found" });
            }
            res.status(200).json({
                response_code: 200,
                response_message: "Success",
                data: subcategory
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }      
    },

    deleteSubCategoryById: async (req, res) => {
        try {
            var id = parseInt(req.params.id);
            const subcategory = await SubCategoryModel.deleteSubCategoryById(id);
            if(!subcategory){

            }
            res.status(200).json({
                response_code: 200,
                response_message: "Success",
                data: subcategory
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }      
    }
}

module.exports = SubCategoryController;