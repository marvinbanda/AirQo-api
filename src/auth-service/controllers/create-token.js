const httpStatus = require("http-status");
const { validationResult } = require("express-validator");
const controlAccessUtil = require("../utils/control-access");
const { badRequest, convertErrorArrayToObject } = require("../utils/errors");
const { logText, logElement, logObject, logError } = require("../utils/log");
const isEmpty = require("is-empty");
const constants = require("@config/constants");
const log4js = require("log4js");
const logger = log4js.getLogger(
  `${constants.ENVIRONMENT} -- create-token-controller`
);

const createAccessToken = {
  create: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }

      let { tenant } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT;
      }

      let request = req;
      request.query.tenant = tenant;
      const responseFromCreateAccessToken =
        await controlAccessUtil.createAccessToken(request);

      if (responseFromCreateAccessToken.success === true) {
        const status = responseFromCreateAccessToken.status
          ? responseFromCreateAccessToken.status
          : httpStatus.OK;
        return res.status(status).json({
          message: responseFromCreateAccessToken.message
            ? responseFromCreateAccessToken.message
            : "",
          created_token: responseFromCreateAccessToken.data
            ? responseFromCreateAccessToken.data
            : [],
        });
      } else if (responseFromCreateAccessToken.success === false) {
        const status = responseFromCreateAccessToken.status
          ? responseFromCreateAccessToken.status
          : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          message: responseFromCreateAccessToken.message
            ? responseFromCreateAccessToken.message
            : "",
          errors: responseFromCreateAccessToken.errors
            ? responseFromCreateAccessToken.errors
            : { message: "" },
        });
      }
    } catch (error) {
      logger.error(`Internal Server Error -- ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },

  list: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }
      logText("we are in baby");
      let { tenant, id } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT;
      }
      logElement("tenant", tenant);
      let request = req;
      request["query"]["tenant"] = tenant;
      const responseFromListAccessToken =
        await controlAccessUtil.listAccessToken(request);

      logObject("responseFromListAccessToken", responseFromListAccessToken);

      if (responseFromListAccessToken.success === true) {
        const status = responseFromListAccessToken.status
          ? responseFromListAccessToken.status
          : httpStatus.OK;
        return res.status(status).json({
          message: responseFromListAccessToken.message
            ? responseFromListAccessToken.message
            : "",
          tokens: responseFromListAccessToken.data
            ? responseFromListAccessToken.data
            : [],
        });
      } else if (responseFromListAccessToken.success === false) {
        const status = responseFromListAccessToken.status
          ? responseFromListAccessToken.status
          : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          message: responseFromListAccessToken.message,
          errors: responseFromListAccessToken.errors
            ? responseFromListAccessToken.errors
            : { message: "" },
        });
      }
    } catch (error) {
      logger.error(`Internal Server Error -- ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },

  verify: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }
      let { tenant } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT || "airqo";
      }
      let request = req;
      request.query.tenant = tenant;
      const responseFromListAccessToken = await controlAccessUtil.verifyToken(
        request
      );
      const status = responseFromListAccessToken.status;
      return res.status(status).send(responseFromListAccessToken.message);
    } catch (error) {
      logger.error(`Internal Server Error ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },

  delete: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }

      let { tenant, id } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT;
      }

      let request = req;
      request["query"]["tenant"] = tenant;
      const responseFromDeleteAccessToken =
        await controlAccessUtil.deleteAccessToken(request);

      if (responseFromDeleteAccessToken.success === true) {
        const status = responseFromDeleteAccessToken.status
          ? responseFromDeleteAccessToken.status
          : httpStatus.OK;
        return res.status(status).json({
          message: responseFromDeleteAccessToken.message
            ? responseFromDeleteAccessToken.message
            : "",
          deleted_token: responseFromDeleteAccessToken.data
            ? responseFromDeleteAccessToken.data
            : {},
        });
      } else if (responseFromDeleteAccessToken.success === false) {
        const status = responseFromDeleteAccessToken.status
          ? responseFromDeleteAccessToken.status
          : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          message: responseFromDeleteAccessToken.message
            ? responseFromDeleteAccessToken.message
            : "",
          errors: responseFromDeleteAccessToken.errors
            ? responseFromDeleteAccessToken.errors
            : { message: "" },
        });
      }
    } catch (error) {
      logger.error(`Internal Server Error -- ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },

  regenerate: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }

      let { tenant, id } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT;
      }

      let request = req;
      request.query.tenant = tenant;
      const responseFromUpdateAccessToken =
        await controlAccessUtil.regenerateAccessToken(request);

      if (responseFromUpdateAccessToken.success === true) {
        const status = responseFromUpdateAccessToken.status
          ? responseFromUpdateAccessToken.status
          : httpStatus.OK;
        return res.status(status).json({
          message: responseFromUpdateAccessToken.message
            ? responseFromUpdateAccessToken.message
            : "",
          updated_token: responseFromUpdateAccessToken.data
            ? responseFromUpdateAccessToken.data
            : [],
        });
      } else if (responseFromUpdateAccessToken.success === false) {
        const status = responseFromUpdateAccessToken.status
          ? responseFromUpdateAccessToken.status
          : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          message: responseFromUpdateAccessToken.message
            ? responseFromUpdateAccessToken.message
            : "",
          errors: responseFromUpdateAccessToken.errors
            ? responseFromUpdateAccessToken.errors
            : { message: "" },
        });
      }
    } catch (error) {
      logger.error(`Internal Server Error -- ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },

  update: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }

      let { tenant, id } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT;
      }

      let request = req;
      request.query.tenant = tenant;
      const responseFromUpdateAccessToken =
        await controlAccessUtil.updateAccessToken(request);

      if (responseFromUpdateAccessToken.success === true) {
        const status = responseFromUpdateAccessToken.status
          ? responseFromUpdateAccessToken.status
          : httpStatus.OK;
        return res.status(status).json({
          message: responseFromUpdateAccessToken.message
            ? responseFromUpdateAccessToken.message
            : "",
          updated_token: responseFromUpdateAccessToken.data
            ? responseFromUpdateAccessToken.data
            : [],
        });
      } else if (responseFromUpdateAccessToken.success === false) {
        const status = responseFromUpdateAccessToken.status
          ? responseFromUpdateAccessToken.status
          : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          message: responseFromUpdateAccessToken.message
            ? responseFromUpdateAccessToken.message
            : "",
          errors: responseFromUpdateAccessToken.errors
            ? responseFromUpdateAccessToken.errors
            : { message: "" },
        });
      }
    } catch (error) {
      logger.error(`Internal Server Error -- ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },

  blackListIp: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }

      let { tenant } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT;
      }

      let request = req;
      request.query.tenant = tenant;
      const responseFromBlackListIp = await controlAccessUtil.blackListIp(
        request
      );

      if (responseFromBlackListIp.success === true) {
        const status = responseFromBlackListIp.status
          ? responseFromBlackListIp.status
          : httpStatus.OK;
        return res.status(status).json({
          message: responseFromBlackListIp.message
            ? responseFromBlackListIp.message
            : "",
          blacklisted_ip: responseFromBlackListIp.data
            ? responseFromBlackListIp.data
            : [],
        });
      } else if (responseFromBlackListIp.success === false) {
        const status = responseFromBlackListIp.status
          ? responseFromBlackListIp.status
          : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          message: responseFromBlackListIp.message
            ? responseFromBlackListIp.message
            : "",
          errors: responseFromBlackListIp.errors
            ? responseFromBlackListIp.errors
            : { message: "" },
        });
      }
    } catch (error) {
      logger.error(`Internal Server Error -- ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },

  removeBlacklistedIp: async (req, res) => {
    try {
      const hasErrors = !validationResult(req).isEmpty();
      logObject("hasErrors", hasErrors);
      if (hasErrors) {
        let nestedErrors = validationResult(req).errors[0].nestedErrors;
        return badRequest(
          res,
          "bad request errors",
          convertErrorArrayToObject(nestedErrors)
        );
      }

      let { tenant, id } = req.query;
      if (isEmpty(tenant)) {
        tenant = constants.DEFAULT_TENANT;
      }

      let request = req;
      request["query"]["tenant"] = tenant;
      const responseFromRemoveBlackListedIp =
        await controlAccessUtil.removeBlacklistedIp(request);

      if (responseFromRemoveBlackListedIp.success === true) {
        const status = responseFromRemoveBlackListedIp.status
          ? responseFromRemoveBlackListedIp.status
          : httpStatus.OK;
        return res.status(status).json({
          message: responseFromRemoveBlackListedIp.message
            ? responseFromRemoveBlackListedIp.message
            : "",
          removed_ip: responseFromRemoveBlackListedIp.data
            ? responseFromRemoveBlackListedIp.data
            : {},
        });
      } else if (responseFromRemoveBlackListedIp.success === false) {
        const status = responseFromRemoveBlackListedIp.status
          ? responseFromRemoveBlackListedIp.status
          : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          message: responseFromRemoveBlackListedIp.message
            ? responseFromRemoveBlackListedIp.message
            : "",
          errors: responseFromRemoveBlackListedIp.errors
            ? responseFromRemoveBlackListedIp.errors
            : { message: "" },
        });
      }
    } catch (error) {
      logger.error(`Internal Server Error -- ${JSON.stringify(error)}`);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: { message: error.message },
      });
    }
  },
};

module.exports = createAccessToken;
