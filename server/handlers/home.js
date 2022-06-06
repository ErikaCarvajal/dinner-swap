const { sendResponse } = require("../lib/utils/sendResponse");
const data = require("../lib/data.json");

// Go Home
const getHome = async (req, res) => {
  const result = "This is from getHome Handler";
  console.log(data);

  sendResponse(res, 200, data, "from getHome");
};

module.exports = getHome;
