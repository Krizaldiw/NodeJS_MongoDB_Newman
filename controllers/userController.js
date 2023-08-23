const userModel = require("../models/userModel");
const {addDataValidate, updateDataValidate} = require("../validation/userValidation");

function validateInput(input) {
    const specChar = /[*|\.":<>[\]{}`\^!/\=\%#()';@&$]/;
    if (specChar.test(input)) {
        return false;
    }
    return true;
}

function validateSqlInjection(input) {
    const sqlKeyword = ['SELECT', 'UPDATE', 'DELETE', 'INSERT', 'DROP', 'CREATE', 'ALTER', 'TRUNCATE', 'EXEC', 'UNION'];
    const re = new RegExp(sqlKeyword.join("|"), "i");
  if (re.test(input)) {
    return false;
  }
  return true;
}

// Add Data Profile
const addData = async (req, res) => {
    try {
        // Check if user with the same NIM already exists
        const nimExists = await userModel.findOne({
            nim: req.body.nim,
        });
        if (nimExists) {
            return res.status(409).json({
                message: `User with the same NIM ${nimExists.nim} already exists`,
            });
        }

        // Check if user with the same Fullname already exists
        const usernameExists = await userModel.findOne({
            fullName: req.body.fullName,
        });
        if (usernameExists) {
            return res.status(409).json({
                message: `User with the same name ${usernameExists.fullName} already exists`,
            });
        }

        // Validate input data
        const { error } = addDataValidate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        // Validate input does not contain spaces at the beginning or middle or end of NIM
        if (/\s/.test(req.body.nim) || /^\s|\s$/.test(req.body.nim) || !/^\S+$/.test(req.body.nim)) {
            return res.status(422).json({
                message:"NIM cannot contain spaces at the beginning, end, or in the middle"
            });
        }

        // Validate input does not contain spaces at the beginning or end of Name
        if (/^\s+|\s+$/.test(req.body.fullName)) {
            return res.status(422).json({
              message: "Name cannot contain spaces at the beginning or end"
            });
        }          

        // Validate input does not contain Special Characters
        if (!validateInput(req.body.nim)) {
            return res.status(422).json({
                message:"NIM cannot contain special characters"
            });
        }
        if (!validateInput(req.body.fullName)) {
            return res.status(422).json({
                message:"Name cannot contain special characters"
            });
        }
        if (!validateInput(req.body.department)) {
            return res.status(422).json({
                message:"Department cannot contain special characters"
            });
        }
        if (!validateInput(req.body.company)) {
            return res.status(422).json({
                message:"Company cannot contain special characters"
            });
        }
        if (!validateInput(req.body.community)) {
            return res.status(422).json({
                message:"Community cannot contain special characters"
            });
        }

        // Validate input does not contain SQL query injection
        if (!validateSqlInjection(req.body.nim)) {
            return res.status(422).json({
                message:"NIM cannot contain SQL Query Injection"
            });
        }
        if (!validateSqlInjection(req.body.fullName)) {
            return res.status(422).json({
                message:"Name cannot contain SQL Query Injection"
            });
        }
        if (!validateSqlInjection(req.body.department)) {
            return res.status(422).json({
                message:"Department cannot contain SQL Query Injection"
            });
        }
        if (!validateSqlInjection(req.body.company)) {
            return res.status(422).json({
                message:"Company cannot contain SQL Query Injection"
            });
        }
        if (!validateSqlInjection(req.body.community)) {
            return res.status(422).json({
                message:"Community cannot contain SQL Query Injection"
            });
        }

        // Create new user
        const newUser = new userModel(req.body);
        const response = await newUser.save();
        const data = response;
        res.status(201).json({
            message: "Data has been created successfully",
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Failed Create Data",
            status: "Create with Valid Value",
        });
    }
};

// Get All Data Profile
const GetData = async (req, res) => {
    
    const CheckData = userModel.find();
    if (CheckData.length == 0) {
        return res.status(404).json({
            message: "Empty Data Requested"
        })
    }
    try {
        const response = await userModel.find();
        const data = response;
        const totalData = data.length;

        res.status(200).json({
            message: "Get All Data Profile Success",
            status: "SuccessGetAllDataProfile",
            total: totalData,
            data
        })
    }catch (error){
        console.log(error);
        res.status(500).json({
            message: "Error getting all data",
            error: error.message,
        });
    }
};

//Get Data Profile By Id
const GetDataById = async (req, res) => {
    const getReqId = req.params.id;
    try {
        const response = await userModel.findById({ _id: getReqId});
        if (!response) {
            return res.status(404).json({
                message: `Data with ID is Not Registered`
            });
        }
        const data = response;
        res.status(200).json({
            message: "Get Data Profile By ID Success",
            data
        });
    }catch (error){
        console.log(error);
        res.status(404).json({
            message: "Data with ID is Not Registered",
            status: "Input Valid ID"
        });
    }
};

// Updated Data 
const UpdatedData = async (req, res) => {
    const getReqId = req.params.id;

    try {
        // Check if user with the same NIM already exists
        // const nimExists = await userModel.findOne({
        //     nim: req.body.nim,
        // });
        // if (nimExists) {
        //     return res.status(422).json({
        //         message: `User with the same NIM ${nimExists.nim} already exists`,
        //     });
        // }

        // Check if user with the same Fullname already exists
        // const usernameExists = await userModel.findOne({
        //     fullName: req.body.fullName,
        // });
        // if (usernameExists) {
        //     return res.status(422).json({
        //         message: `User with the same name ${usernameExists.fullName} already exists`,
        //     });
        // }

        // Validate input data
        const {error} = await updateDataValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Validate input does not contain Special Characters
        if (!validateInput(req.body.nim)) {
            return res.status(422).json({
                message:"NIM cannot contain special characters"
            });
        }
        if (!validateInput(req.body.fullName)) {
            return res.status(422).json({
                message:"Name cannot contain special characters"
            });
        }
        if (!validateInput(req.body.department)) {
            return res.status(422).json({
                message:"Department cannot contain special characters"
            });
        }

        // Validate input does not contain SQL query injection
        if (!validateSqlInjection(req.body.nim)) {
            return res.status(422).json({
                message:"NIM cannot contain SQL Query Injection"
            });
        }
        if (!validateSqlInjection(req.body.fullName)) {
            return res.status(422).json({
                message:"Name cannot contain SQL Query Injection"
            });
        }
        if (!validateSqlInjection(req.body.department)) {
            return res.status(422).json({
                message:"Department cannot contain SQL Query Injection"
            });
        }

        const response = await userModel.findByIdAndUpdate({ _id: getReqId}, { $set: req.body});
        if (!response) {
            return res.status(422).json({
                message: `Data with ID is Not Registered`
            });
        }
        const beforeUpdated = response;
        const afterUpdated = await userModel.findById({ _id: getReqId})
        res.status(201).json({
            message: "Success Updated Data",
            status: "UpdatedDataProfileSuccess",
            beforeUpdated,
            afterUpdated
        });
    } catch (error){
        {
            console.log(error);
            res.status(404).json({
                message: "Data with ID is Not Registered",
                status: "Input Valid ID"
            });
        }
    }
}

// Deleted Data
const DeletedData = async (req, res) => {
    const getReqId = req.params.id;

    try {
        const response = await userModel.findByIdAndRemove({ _id: getReqId});
        if (!response) {
            return res.status(404).json({
                message: `Data with ID is Not Registered`
            });
        }
        const data = response;
        res.status(200).json({
            message: "Success Deleted Data",
            status: "DeletedDataProfileSuccess",
            data
        });
    } catch (error){
        {
            console.log(error);
            res.status(404).json({
                message: "Data with ID is Not Registered",
                status: "Input Valid ID"
            });
        }
    }
}

module.exports = {
    addData, GetData, GetDataById, UpdatedData, DeletedData
};
