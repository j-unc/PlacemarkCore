import Joi from "joi";

export const UserSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlacemarkSpec = {
  userId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
};