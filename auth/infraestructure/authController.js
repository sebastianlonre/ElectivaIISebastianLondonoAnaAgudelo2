const registerUser = require("../aplication/registerUser");
const {loginUser} = require("../aplication/loginUser")

const registerUserItem = async (request, response) => {
  const { userName, userLastName, userTag, email, password } = request.body;

  const userData = { userName, userLastName, userTag, email, password };

  try {
    const result = await registerUser(userData);
    if (result.message_error) {
      return response.status(400).json(result);
    }

    return response.status(200).json(result);
  } catch (error) {
    return response
      .status(500)
      .json({ message_error: "[ERROR] Unexpected server error" + error });
  }
};

const loginUserItem = async (req, res) => {
  const { userTag, password } = req.body;

  try {
    const result = await loginUser({ userTag, password });

    if (result.message_error) {
      return res.status(400).json(result);
    }

    req.session.user = { userTag };
    
    return res.status(200).json({
      message: result.message,
      token: result.token,
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message_error: "[ERROR] Unexpected server error: " + error,
    });
  }
};


const logoutUserItem = async (req, res) => {

  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message_error: "[ERROR] Could not log out" });
    }
    res.status(200).json({ message: "[INFO] Logout successful" });
  });
};

module.exports = { registerUserItem, loginUserItem, logoutUserItem };