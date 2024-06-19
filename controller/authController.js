const jwt = require("jsonwebtoken");
const { message } = require("../utils/constants");
const User = require("../Model/UserModel");

/**
 *
 * @param {*} req in req it will have token in headers from the headers we will take the token and check
 * @param {*} res if token is invalid it will throw error
 * @param {*} next if token is valid then it will goes to the next middleware
 */
exports.protect = async (req, res, next) => {
  try {
    // check is there the token in headers
    if (req.headers.authorization === undefined) {
      throw new Error(message.NO_TOKEN);
    }
    if (!req.headers.authorization.startsWith(message.BEARER)) {
      throw new Error(message.SIGN_IN);
    }
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error(message.NO_TOKEN);
    }

    // after decoded it will get the current user id
    decoded = jwt.verify(token, process.env.USER_SECRET_KEY);

    // checking again if the user is in the db and also is the user account is active
    const user = await User.findById({ _id: decoded.id, active: true });

    // if no user found then throw a error
    if (!user) {
      throw new Error(message.USER_NOT_EXISIST);
    }
    // saving current logged in user id in req
    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(400).json({
      status: message.FAIL_MESSAGE,
      statusCode: res.statusCode,
      message: `${message.ERROR}:${err.message}`,
    });
  }
};
