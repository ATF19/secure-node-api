/**
** This helper is used to validate the request sent by a user using JoiJS
*/

// Packages imports
const Joi = require('joi');

// Exporting our validating method
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
     }
      req.value['body'] = result.value;
      next();
    }
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
};
