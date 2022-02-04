import joi from "joi";

const recordsSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().pattern(new RegExp('(^entry$)|(^exit$)')).required()
});

export default recordsSchema;