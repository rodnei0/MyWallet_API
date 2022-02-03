import loginSchema from "../schemas/loginSchema.js";

export default function validateLoginSchemaMiddleware(req, res, next) {
    const validation = loginSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        validation.error.details.map(error => console.log(error));
        res.status(422).send("Preencha os campos corretamente!");
        return
    }

    next();
}