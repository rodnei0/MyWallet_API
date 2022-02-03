import signupSchema from "../schemas/signupSchema.js";

export default function validateSignupSchemaMiddleware(req, res, next) {
    const validation = signupSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        validation.error.details.map(error => console.log(error));
        res.sendStatus(422);
        return
    }

    next();
}