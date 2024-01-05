const MainCategoryService = require('../../services/interviewquestions/iqMainCategoryService');

const MainCategoryModel = {
    createmaincategory: async (reqBody, res) => {
        try{
            const { category_name } = reqBody;
            const createmaincategory = await MainCategoryService.create(category_name);
            return createmaincategory;
        } catch (error) {
            console.error(error.message);
        }
    },

    getmaincategory: async () => {
        try {
            const getmaincategory = await MainCategoryService.get();
            return getmaincategory;
        } catch (error) {
            console.error(error.message);
        }
    },

    updatemaincategoryById: async (id, category_name) => {
        try {
            const updatemaincategory = await MainCategoryService.update(id, category_name);
            return updatemaincategory;
        } catch (error) {
            console.error(error.message);
        }
    },

    deletemaincategoryById: async (id) => {
        try {
            const deletemaincategory = await MainCategoryService.delete(id);
            return deletemaincategory;
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = MainCategoryModel;