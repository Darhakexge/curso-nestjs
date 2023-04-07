import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    NODE_ENV: Joi.alternatives('local', 'testing', 'production').required(),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.required(),
    DB_PORT: Joi.number().required(),
    DB_DATABASE: Joi.required(),
});
