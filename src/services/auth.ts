import { Rol, User } from "../type"
import UserModel from "../models/user.model";
import { encrypt, verified } from "../utils/bcypt.handle";
import { generateToken } from "../utils/jwt.handle";

const loginService = async ({ user, password }: Partial<User>) => {
  const checkIs = await UserModel.findOne({ user });
  if (!checkIs) throw Error("USUARIO O CONTRASEÑA INCORRECTA");

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password ?? '', passwordHash);

  if (!isCorrect) throw Error("USUARIO O CONTRASEÑA INCORRECTA");

  const token = generateToken(`${checkIs.id}`);
  return token;
}

const registerService = async (data: Partial<User>) : Promise<User> => {
  if(data.user == null || data.user == "") throw Error("ERROR USUARIO");
  if(data.password == null || data.password == "") throw Error("ERROR CONTRASEÑA");
  if(data.rol == null || !Object.values(Rol).includes(data.rol)) throw Error("ERROR ROL");

  const passHash = await encrypt(data.password ?? '');
  const newUser = await UserModel.create({
    user: data.user,
    password: passHash,
    rol: data.rol,
  });

  if(!newUser) throw Error("ERROR REGISTRAR USUARIO")
  
  return newUser;
}

export {
  loginService,
  registerService,
}