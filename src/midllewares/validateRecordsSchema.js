import recordsSchema from "../schemas/recordsSchema.js";

export default function validateRecordsSchema(req, res, next) {
    const validation = recordsSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        validation.error.details.map(error => console.log(error));
        res.status(422).send("Preencha os campos corretamente!");
        return
    }

    next();
}