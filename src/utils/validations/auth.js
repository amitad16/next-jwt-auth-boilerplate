import Joi from "joi";
import { password } from "./custom";

export const register = Joi.object().keys({
  firstName: Joi.string().required().messages({
    "string.empty": "First Name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last Name is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  password: Joi.string()
    .required()
    .custom(password)
    .messages({ "string.empty": "Password is required" }),
  acceptedTerms: Joi.boolean().valid(true).required().messages({
    "any.only": "Please accept our Terms and Conditions",
  }),
});

export const login = Joi.object().keys({
  email: Joi.string()
    .required({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const logout = {};

export const refreshTokens = {};

export const forgotPassword = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
    }),
});

export const resetPassword = Joi.object().keys({
  password: Joi.string()
    .required()
    .custom(password)
    .messages({ "string.empty": "Please type your new password" }),
  confirmPassword: Joi.equal(Joi.ref("password")).messages({
    "any.only": "Passwords does not match",
  }),
});

export const sendEmailVerification = Joi.object().keys({
  isRegistration: Joi.boolean(),
});

export const verifyEmail = Joi.object().keys({
  token: Joi.string().required(),
});

export const sendPhoneVerification = {};

export const verifyPhone = Joi.object().keys({
  token: Joi.string().required(),
});
