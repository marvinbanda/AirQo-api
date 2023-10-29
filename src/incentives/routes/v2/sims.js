const express = require("express");
const router = express.Router();
const createSimController = require("@controllers/create-sim");
const { check, oneOf, query, body, param } = require("express-validator");
const constants = require("@config/constants");
const { logObject } = require("@utils/log");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const validatePagination = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10);
  const skip = parseInt(req.query.skip, 10);
  req.query.limit = isNaN(limit) || limit < 1 ? 1000 : limit;
  req.query.skip = isNaN(skip) || skip < 0 ? 0 : skip;
  next();
};

const headers = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
};

router.use(headers);
router.use(validatePagination);

/***************** create-sim usecase ***********************/
router.post(
  "/",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      body("msisdn")
        .exists()
        .withMessage("the msisdn is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the msisdn should not be empty")
        .bail()
        .isInt()
        .withMessage("the msisdn should be a number")
        .trim(),
      body("simBarcode")
        .optional()
        .notEmpty()
        .withMessage("simBarcode should not be empty IF provided")
        .bail()
        .trim(),
      body("plan")
        .optional()
        .notEmpty()
        .withMessage("plan should not be empty IF provided")
        .bail()
        .trim(),
      body("status")
        .optional()
        .notEmpty()
        .withMessage("status should not be empty IF provided")
        .bail()
        .trim(),
      body("name")
        .optional()
        .notEmpty()
        .withMessage("name should not be empty IF provided")
        .bail()
        .trim(),
      body("activationDate")
        .optional()
        .notEmpty()
        .withMessage("activationDate should not be empty IF provided")
        .bail()
        .trim()
        .toDate()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("activationDate must be a valid datetime."),
      body("active")
        .optional()
        .notEmpty()
        .withMessage("active should not be empty IF provided")
        .bail()
        .isBoolean()
        .withMessage("active must be Boolean")
        .trim(),
      body("balance")
        .optional()
        .notEmpty()
        .withMessage("the balance should not be empty IF provided")
        .bail()
        .isInt()
        .withMessage("the balance should be a number")
        .trim(),
      body("dataBalanceThreshold")
        .optional()
        .notEmpty()
        .withMessage("the dataBalanceThreshold should not be empty IF provided")
        .bail()
        .isInt()
        .withMessage("the dataBalanceThreshold should be a number")
        .trim(),
      body("totalTraffic")
        .optional()
        .notEmpty()
        .withMessage("the totalTraffic should not be empty IF provided")
        .bail()
        .isInt()
        .withMessage("the totalTraffic should be a number")
        .trim(),
      body("deviceId")
        .optional()
        .notEmpty()
        .withMessage("the deviceId cannot be empty IF provided")
        .bail()
        .trim()
        .isMongoId()
        .withMessage("deviceId must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        }),
    ],
  ]),
  createSimController.create
);

router.post(
  "/bulk",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      body("sims")
        .exists()
        .withMessage("the sims is missing in the request body")
        .bail()
        .isArray()
        .withMessage("sims should be an array"),
      body("sims.*")
        .optional()
        .isInt()
        .withMessage("Each element in the sims array should be a number")
        .bail()
        .isLength({ min: 15, max: 15 })
        .withMessage(
          "Each element in the sims array should be exactly 15 digits long"
        ),
    ],
  ]),
  createSimController.createBulk
);

router.get(
  "/",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      query("id")
        .optional()
        .notEmpty()
        .withMessage("the id cannot be empty IF provided")
        .bail()
        .trim()
        .isMongoId()
        .withMessage("id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        }),
      query("device_id")
        .optional()
        .notEmpty()
        .withMessage("the device_id cannot be empty IF provided")
        .trim()
        .isMongoId()
        .withMessage("device_id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        }),
    ],
  ]),
  createSimController.list
);
router.put(
  "/:sim_id",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    param("sim_id")
      .exists()
      .withMessage("the sim_id is missing in the request")
      .bail()
      .isMongoId()
      .withMessage("sim_id must be an object ID")
      .bail()
      .customSanitizer((value) => {
        return ObjectId(value);
      })
      .trim(),
  ]),
  oneOf([
    [
      body("msisdn")
        .optional()
        .notEmpty()
        .withMessage("msisdn should not be empty IF provided")
        .bail()
        .isInt()
        .withMessage("the msisdn should be a number")
        .trim(),
      body("dataBalanceThreshold")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("the dataBalanceThreshold should not be empty IF provided")
        .bail()
        .isInt()
        .withMessage(
          "the dataBalanceThreshold in some of the inputs should be an integer value"
        ),
      body("simBarcode")
        .optional()
        .notEmpty()
        .withMessage("simBarcode should not be empty IF provided")
        .bail()
        .trim(),
      body("plan")
        .optional()
        .notEmpty()
        .withMessage("plan should not be empty IF provided")
        .bail()
        .trim(),
      body("status")
        .optional()
        .notEmpty()
        .withMessage("status should not be empty IF provided")
        .bail()
        .trim(),
      body("name")
        .optional()
        .notEmpty()
        .withMessage("name should not be empty IF provided")
        .bail()
        .trim(),
      body("activationDate")
        .optional()
        .notEmpty()
        .withMessage("activationDate should not be empty IF provided")
        .bail()
        .trim()
        .toDate()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("activationDate must be a valid datetime."),
      body("active")
        .optional()
        .notEmpty()
        .withMessage("active should not be empty IF provided")
        .bail()
        .isBoolean()
        .withMessage("active must be Boolean")
        .trim(),
      body("balance")
        .optional()
        .notEmpty()
        .withMessage("the balance should not be empty IF provided")
        .bail()
        .isInt()
        .withMessage("the balance should be a number")
        .trim(),
      body("totalTraffic")
        .optional()
        .notEmpty()
        .withMessage("the totalTraffic should not be empty IF provided")
        .bail()
        .isInt()
        .withMessage("the totalTraffic should be a number")
        .trim(),
      body("deviceId")
        .optional()
        .notEmpty()
        .withMessage("the deviceId cannot be empty IF provided")
        .bail()
        .trim()
        .isMongoId()
        .withMessage("deviceId must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        }),
    ],
  ]),
  createSimController.update
);
router.delete(
  "/:sim_id",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    param("sim_id")
      .exists()
      .withMessage("the sim_id is missing in the request")
      .bail()
      .trim()
      .isMongoId()
      .withMessage("id must be an object ID")
      .bail()
      .customSanitizer((value) => {
        return ObjectId(value);
      }),
  ]),
  createSimController.delete
);
router.get(
  "/:sim_id/status",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      param("sim_id")
        .exists()
        .withMessage("the sim_id is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the sim_id should not be empty")
        .bail()
        .isMongoId()
        .withMessage("sim_id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        })
        .trim(),
    ],
  ]),
  createSimController.checkStatus
);
router.get(
  "/:sim_id/activate",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      param("sim_id")
        .exists()
        .withMessage("the sim_id is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the sim_id should not be empty")
        .bail()
        .isMongoId()
        .withMessage("sim_id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        })
        .trim(),
    ],
  ]),
  createSimController.activateSim
);
router.delete(
  "/:sim_id/deactivate",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      param("sim_id")
        .exists()
        .withMessage("the sim_id is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the sim_id should not be empty")
        .bail()
        .isMongoId()
        .withMessage("sim_id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        })
        .trim(),
    ],
  ]),
  createSimController.deactivateSim
);
router.put(
  "/:sim_id/update",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      param("sim_id")
        .exists()
        .withMessage("the sim_id is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the sim_id should not be empty")
        .bail()
        .isMongoId()
        .withMessage("sim_id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        })
        .trim(),
      body("name")
        .exists()
        .withMessage("the name is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the name should not be empty")
        .trim(),
    ],
  ]),
  createSimController.updateSimName
);
router.post(
  "/:sim_id/recharge",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      param("sim_id")
        .exists()
        .withMessage("the sim_id is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the sim_id should not be empty")
        .bail()
        .isMongoId()
        .withMessage("sim_id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        })
        .trim(),
      body("amount")
        .exists()
        .withMessage("the amount is missing in your request")
        .bail()
        .notEmpty()
        .withMessage("the amount should not be empty")
        .bail()
        .isInt()
        .withMessage("the amount should be a number")
        .trim(),
    ],
  ]),
  createSimController.rechargeSim
);
router.get(
  "/:sim_id",
  oneOf([
    query("tenant")
      .optional()
      .notEmpty()
      .withMessage("tenant should not be empty IF provided")
      .bail()
      .trim()
      .toLowerCase()
      .isIn(constants.NETWORKS)
      .withMessage("the tenant value is not among the expected ones"),
  ]),
  oneOf([
    [
      param("sim_id")
        .exists()
        .withMessage("the sim_id is missing in the request")
        .bail()
        .notEmpty()
        .withMessage("the provided sim_id must not be empty")
        .bail()
        .trim()
        .isMongoId()
        .withMessage("sim_id must be an object ID")
        .bail()
        .customSanitizer((value) => {
          return ObjectId(value);
        }),
    ],
  ]),
  createSimController.list
);

module.exports = router;
