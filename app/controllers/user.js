const userService = require("../services/user.js");
const validator = require("../middleware/validation.js");
const logger = require("../../config/logger.js");

class UserControll {
  /**
   * @description Create and save the new User Data after validation
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  create = (req, res) => {
    console.log("user data",req.body);
    const userDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: req.body.password
      
    };
    // var validationResult = validator.joiUserValidator.validate(userDetails);
    // if (validationResult.error) {
    //   return res.status(400).send({
    //     success: false,
    //     message: validationResult.error.details[0].message,
    //   });
    // }
    userService.create(userDetails, (error, resultdata) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "User already Exists",
        });
      }
      res.status(201).send({
        success: true,
        data: resultdata,
        message: "User Registered successfully",
      });
    });
  };

  /**
   * @description to login the User Data
   * @param req is request sent from http having emailId and Password
   * @param res is used to send the Response
   */
  login = (req, res) => {
    const credentials = {
      emailId: req.body.emailId,
      password: req.body.password
    };
    // var validationResult =
    //   validator.joiCredentialsValidator.validate(credentials);
    // if (validationResult.error) {
    //   logger.error(validationResult.error.details[0].message);
    //   return res.status(400).send({
    //     success: false,
    //     message: validationResult.error.details[0].message,
    //   });
    // }

    userService.checkLoginDetails(credentials, (error, data) => {
      if (error) {
        return res.status(404).send({
          success: false,
          message: error,
        });
      }
      res.send({
        success: true,
        message: "logged in successfully",
        token: data,
      });
    });
  };
}
module.exports = new UserControll();
