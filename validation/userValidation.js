const joi = require("joi");

const errorMessages = {
    nim: {
        required: "NIM is required",
        min: "NIM length must be at least 7 characters long"
    },
    fullName: {
        required: "Full name is required",
        min: "Full name length must be at least 3 characters long"
    },
    department: {
        required: "Department is required",
        min: "Department length must be at least 7 characters long"
    },
    company: {
        required: "Company is required",
        min: "Company length must be at least 4 characters long"
    }
    // Add more error messages for other fields if needed
};

//Add Data Validation
const addDataValidate = (data) => {
    const userSchema = joi.object({
        nim: joi.string().required().min(7).message(errorMessages.nim),
        fullName: joi.string().required().min(3).message(errorMessages.fullName),
        department: joi.string().required().min(7).message(errorMessages.department),
        company: joi.string().required().min(4).message(errorMessages.company),
        community: joi.array().items(joi.string())
    });
    return userSchema.validate(data, { messages: errorMessages }); // Pass the messages object to the validate function
};

//Update Data Validation
const updateDataValidate = (data) => {
    const userSchema = joi.object({
        nim: joi.string().required().min(7).message(errorMessages.nim),
        fullName: joi.string().required().min(3).message(errorMessages.fullName),
        department: joi.string().required().min(7).message(errorMessages.department),
        company: joi.string().required().min(4).message(errorMessages.company),
        community: joi.array().items(joi.string())
    });
    return userSchema.validate(data, { messages: errorMessages }); // Pass the messages object to the validate function
};

module.exports.addDataValidate = addDataValidate;
module.exports.updateDataValidate = updateDataValidate;