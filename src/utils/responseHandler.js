const errorHandler = (res, statusCode, message) => {
    console.log("message",JSON.stringify(message))
    return res.status(statusCode).json({ message });
};
  module.exports = errorHandler;
  