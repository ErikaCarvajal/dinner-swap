const {sendResponse} = require("../lib/utils");

// Go Home
const getHome = async (req, res) => {
  const result = "This is from getHome Handler";
  sendResponse(res, 200, result, "from getHome");
};

module.exports = { getHome };