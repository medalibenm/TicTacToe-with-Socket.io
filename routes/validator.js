const Joi = require('joi');

const characterSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    level: Joi.number().integer().min(0).required(),
});

function validateCharacter(req, res, next) {
    const { error } = characterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = validateCharacter;
