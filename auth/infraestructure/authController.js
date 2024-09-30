const registerUser = require("../aplication/registerUser");

const registerUserItem = async (request, response) =>{
  const { userName, userLastName, userTag, email ,password } = request.body;

  const userData = { userName, userLastName, userTag, email ,password };

  try {
    const result = await registerUser(userData);
    if (result.menssage_error) {
      return response.status(400).json(result);
    }

    return response.status(201).json(result);
  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error"+ error });
  }

}

module.exports = {registerUserItem};