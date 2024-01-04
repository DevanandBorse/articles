const pool = require('../../../database');

const userService={
//Insert Users
 createUser : async (name, password, email, address, mobile_number, status, created_on) => {
  try{
  const users = await pool.query(
    'INSERT INTO users(name, password, email, address, mobile_number, status, created_on) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [name, password, email, address, mobile_number, status, created_on]
  );
  return users.rows[0];
  }catch(error){
    console.error(error.message);
  } 
},

//get all users
 getAll :async () => {
  try{
    const users = await pool.query(
      'SELECT id, name, password, email, address, mobile_number, status, created_on FROM users'
    );
    return users.rows;
  }catch(error){
    console.error(error.message);
  }
},
//get user by id
 getUsersById:async(id)=>{
  try{
    const users=await pool.query(
        'SELECT id, name, password, email, address, mobile_number, status, created_on FROM users WHERE id=$1',
        [id]
    );
    return users.rows;
}catch(error){
  console.error(error.message);
}
 },
//update user by id
 updateUserById : async (id, userData) => {
  try{
    const {
      name,
      password,
      email,
      address,
      mobile_number,
      status,
      created_on,
    } = userData;
  
    const updateUser = await pool.query(
      'UPDATE users SET name=$1, password=$2, email=$3, address=$4, mobile_number=$5, status=$6, created_on=$7 WHERE id=$8 RETURNING *',
      [name, password, email, address, mobile_number, status, created_on, id]
    );
  
    return updateUser.rows[0];
  }catch(error){
    console.error(error.message);
  }
},


  //delete user by id
   deleteUserById : async (id) => {
    try{
    const users = await pool.query('UPDATE users SET status=0 WHERE id=$1 AND status=1 RETURNING *', [id]);
    return users.rows;
  }catch(error){
    console.error(error.message);
  }
},
}

module.exports = userService;
