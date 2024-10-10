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

    return response.status(201).json(result);
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
      return res.status(400).json({
        ok: false,
        message_error: result.message_error,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Successful login",
      token: result.token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message_error: "[ERROR] Unexpected server error: " + error,
    });
  }
};

module.exports = { registerUserItem, loginUserItem };