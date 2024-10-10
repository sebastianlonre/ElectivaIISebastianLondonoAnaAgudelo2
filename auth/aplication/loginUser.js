const { findUser } = require("../../users/infraestructure/userAdapters"); 
const { generateToken } = require("../aplication/generateJWT");

const loginUser = async (userData) => {
  const { userTag, password } = userData;
  

  try {
    const { user, message_error } = await findUser(userTag);
    if (message_error || !user) {
      return { message_error: "[ERROR] User not found" };
    }
    
    const token = generateToken({ userTag, password });
    
    return { message: "[INFO] Login successful", token };
  } catch (error) {
    return { message_error: "[ERROR] Login failed: " + error };
  }
};

module.exports = { loginUser };
