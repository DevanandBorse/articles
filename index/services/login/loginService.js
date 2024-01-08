const pool = require("../../../database");

const getUserByEmailAndPassword = async (email, password) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );
  return user.rows[0];
};

module.exports = { getUserByEmailAndPassword };
