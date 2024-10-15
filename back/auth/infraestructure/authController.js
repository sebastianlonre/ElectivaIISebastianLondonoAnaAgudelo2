const { loginUser } = require("../aplication/loginUser");
const registerUser = require("../aplication/registerUser");

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

  if(req.session.user){
    return res.status(400).json({message_error: `${req.session.user.userTag} already logged, close the session firts`})
  }

  try {
    const result = await loginUser({ userTag, password });

    if (result.message_error) {
      return res.status(400).json(result);
    }

    const userName = result.userInfo.userName;
    const userLastName = result.userInfo.userLastName;

    req.session.user = { userTag, userName, userLastName };

    req.session.lastActivity = Date.now();
    req.session.cookie.expires = new Date(Date.now() + (2 * 60 * 60 * 1000));

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

  if(!req.session.user){
    return res.status(400).json({message_error: "Not user logged"})
  }

  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message_error: "[ERROR] Could not log out" + err});
    }
    res.status(200).json({ message: "[INFO] Logout successful" });
  });
};

const checkAuthentication = (req, res, next) => {
  if (req.session.user) {
      next();
  } else {
      res.status(401).json({ message_error: "[ERROR] Not authenticated Users currently" });
  }
};

const sessionRenewalMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    const now = Date.now();
    const timeToActivity = 10 * 60 * 1000;
    const sessionExpiry = 2 * 60 * 60 * 1000;

    if (now - req.session.lastActivity > sessionExpiry) {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ message_error: "[ERROR] Could not log out" + err });
        }
        return res.status(401).json({ message_error: "[ERROR] Session has expired, please log in again" });
      });
      return;
    }

    if (now - req.session.lastActivity < timeToActivity) {
      req.session.lastActivity = now;
      req.session.cookie.expires = new Date(Date.now() + sessionExpiry);
    }
  }
  next();
};


module.exports = { registerUserItem, loginUserItem, logoutUserItem, checkAuthentication, sessionRenewalMiddleware };