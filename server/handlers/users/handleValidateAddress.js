const { validateAddress } = require("../../lib/utils/validateAddress");

const handleValidateAddress = (req, res) => {
  const { address } = req.body;

  validateAddress(address);
  res.send(200);
};

module.exports = handleValidateAddress;
