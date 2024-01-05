const SubCategoryService = require('../../services/interviewquestions/iqSubCategoryService');

const SubCategoryModel = {
    createSubCategory: async (category_name, parent_category) => {
        try {
            const createSubCategory = await SubCategoryService.create(category_name, parent_category);
            return createSubCategory;
        } catch (error) {
            console.error(error.message);
        }
    },

    getSubCategory: async () => {
        try {
            const getSubCategory = await SubCategoryService.get();
            return getSubCategory;
        } catch (error) {
            console.error(error.message);
        }
    },

    updateSubCategoryById: async (category_name, parent_category, id) => {
        try {
            const getSubCategory = await SubCategoryService.update(category_name, parent_category, id);
            return getSubCategory;
        } catch (error) {
            console.error(error.message);
        }
    },

    deleteSubCategoryById: async (id) => {
        try {
            const getSubCategory = await SubCategoryService.delete(id);
            return getSubCategory;
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = SubCategoryModel;