const express = require("express");
const palworldController=require('../../controllers/palworldController');
const userController=require('../../controllers/userController')
const router = express.Router();
//pals
router.get("/", palworldController.getAllPals);
router.get("/:palId", palworldController.getOnePal);
router.post("/",palworldController.createNewPal );
router.patch("/:palId", palworldController.updateOnePal);
router.delete("/:palId", palworldController.deleteOnePal);
//users
router.get("/users/:user/:password", userController.getOneUser);
router.post("/users",userController.createUser)


module.exports = router;