// All database relations are presented here
const Pool = require('../../../database');

const SubCategoryService = {
    create: async (category_name, parent_category) => {
        try {
            const subcategory = await Pool.query(
                `INSERT INTO interview_questions_sub_category (category_name, parent_category) VALUES ($1, $2) RETURNING *`,
                [category_name, parent_category]
            );
            return subcategory.rows[0];
        } catch (error) {
            console.error(error.message);
        }
    },

    get: async () => {
        try {
            const subcategory = await Pool.query(
                `SELECT id, category_name, parent_category FROM interview_questions_sub_category`
            );
            return subcategory.rows;
        } catch (error) {
            console.error(error.message);
        }  
    },

    update: async (category_name, parent_category, id) => {
        try {
            const subcategory = await Pool.query(
                `UPDATE interview_questions_sub_category SET category_name = $1, parent_category = $2 WHERE id = $3 RETURNING *`,
                [category_name, parent_category, id]
            );
            return subcategory.rows;
        } catch (error) {
            console.error(error.message);
        }
    },

    delete: async (id) => {
        try {
            const subcategory = await Pool.query(
                `DELETE FROM interview_questions_sub_category WHERE id = $1 RETURNING *`,
                [id]
            );
            return subcategory.rows;
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = SubCategoryService;