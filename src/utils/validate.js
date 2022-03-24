import Joi from "joi";

const validate = (schema, data) => {
  const { value, error } = Joi.compile(schema).validate(data, {
    errors: { label: "key" },
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return { error: errorMessage };
  }
  return { value };
};

export default validate;
