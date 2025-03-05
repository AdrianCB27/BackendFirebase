import fs from "fs";

const getUser = (user, pass) => {
  try {
    const archivo = fs.readFileSync("./src/database/db.json", "utf-8");
    const users = JSON.parse(archivo).users;

    const usuarioEncontrado = users.find(
      (usuario) => usuario.user == user && usuario.pass == pass
    );
    return usuarioEncontrado; //puede ser user o undefined si no lo encuentra
  } catch (error) {
    console.error("Error reading file: ", error);
    throw error;
  }
};
const addUser = (newUser) => {
  try {
    const archivo = fs.readFileSync("./src/database/db.json", "utf-8");
    let data = JSON.parse(archivo);
    data.users.push(newUser);
    fs.writeFileSync("./src/database/db.json",JSON.stringify(data, null, 2),"utf-8");
    return newUser;
  } catch (error) {
    console.error("Error reading file: ", error);
  }
};
export { getUser, addUser };
