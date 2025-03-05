const usersService= require('../services/usersService');
const getOneUser = (req,resp)=>{
     const oneUser = usersService.getUser(req.params.user,req.params.password);
      if (oneUser) {
        resp.status(200).send({ status: "OK", data: oneUser });
      } else {
        resp.status(404).send({
          status: "FAILED",
          data: {
            error: "User not found, access denied",
          },
        });
      }
}
const createUser=(req,resp)=>{
    const { body } = req;
      if (
        !body.user ||
        !body.pass ||
        !body.email 
      ) {
        resp.status(400).send({
          status: "FAILED",
          data: {
            error:
              "One of the following keys is missing or is empty in request body: user,pass,email",
          },
        });
      } else {
        const createdUser =  usersService.addUser(req.body);
        resp.status(201).send(createdUser);
      }
}
module.exports={getOneUser,createUser}
