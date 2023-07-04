const router = require("express").Router();
const userController = require("../controllers/userController") 

router.post("/addData", userController.addData);
router.get("/GetData", userController.GetData);
router.get("/GetDataById/:id", userController.GetDataById);
router.put("/UpdatedData/:id", userController.UpdatedData);
router.delete("/DeletedData/:id", userController.DeletedData);

module.exports = router;