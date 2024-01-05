const Pool = require('../../../database');

const MainCategoryService = {
    create: async (category_name) => {
        try {
            const maincategory = await Pool.query(
                "INSERT INTO interview_questions_main_category(category_name) VALUES($1) RETURNING *",
                [category_name]
            );
            return maincategory.rows[0];
        } catch (error) {
            console.error(error.message);
        }
    },

    get: async () => {
        try {
            const maincategory = await Pool.query(
                "SELECT id, category_name FROM interview_questions_main_category ORDER BY id DESC"
            );
            return maincategory.rows;
        } catch (error) {
            console.error(error.message);
        }
    },

    update: async (id, category_name) => {
        try {
            const maincategory = await Pool.query(
                "UPDATE interview_questions_main_category SET category_name = $1 WHERE id = $2 RETURNING *", 
                [category_name, id]
            );
            return maincategory.rows;
        } catch (error) {
            console.error(error.message);
        }
    },

    delete: async (id) => {
        try {
            const maincategory = await Pool.query(
                "DELETE FROM interview_questions_main_category WHERE id = $1 RETURNING *",
                [id]
            )
            return maincategory.rows;
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = MainCategoryService;