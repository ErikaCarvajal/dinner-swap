const addressValidator = require("address-validator");
const { Address } = addressValidator;
var _ = require("underscore");

const validateAddress = ({ street, city, state, country }) => {
  var address = new Address({ street, city, state, country });
  addressValidator.validate(
    address,
    addressValidator.match.streetAddress,
    function (err, exact, inexact) {
      if (err) {
        console.log(err);
      }
      console.log("input: ", address.toString());
      console.log(
        "match: ",
        _.map(exact, function (a) {
          return a.toString();
        })
      );
      console.log(
        "did you mean: ",
        _.map(inexact, function (a) {
          return a.toString();
        })
      );

      //access some props on the exact match
      var first = exact[0];
      console.log(first.streetNumber + " " + first.street);
    }
  );
};

module.exports = { validateAddress };
