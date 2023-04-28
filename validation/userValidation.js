const joi = require("joi");

//Add Data Validation
const addDataValidate = (data) => {
    const userSchema = joi.object({
        nim: joi.string().required().min(7),
        fullName: joi.string().required().min(3),
        department: joi.string().required(),
        company: joi.string().required(),
        community: joi.array().items(joi.string())
    });
    return userSchema.validate(data)
};

//Update Data Validation
const updateDataValidate = (data) => {
    const userSchema = joi.object({
        nim: joi.string().required().min(7),
        fullName: joi.string().required().min(3),
        department: joi.string().required(),
        company: joi.string().required(),
        community: joi.array().items(joi.string())
    });
    return userSchema.validate(data)
};

module.exports.addDataValidate = addDataValidate;
module.exports.updateDataValidate = updateDataValidate;