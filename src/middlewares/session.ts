import { NextFunction, Response } from "express";
import { RequestExt, Rol } from "../type";
import { handleError } from "../utils/error.handle";
import { verifyToken } from "../utils/jwt.handle";
import UserModel from "../models/user.model";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const jwtUser = verifyToken(`${jwt}`) as { idUser: string };
    if (!jwtUser) {
      res.status(401);
      res.send("NO TIENES UN JWT VALIDO");
    } else {
      req.idUser = jwtUser;
      next();
    }
  } catch (e: any) {
    handleError(res, "SESSION NO VALIDA", e);
  }
};

const isUser = async ({ idUser }: RequestExt, res: Response, next: NextFunction) => {
  try {
    const idU = idUser?.idUser;

    const checkIs = await UserModel.findOne({ _id: idU });

    if (checkIs && checkIs.rol == Rol.USUARIO) {
      next();
    } else {
      throw Error("NO TIENE PERMISOS PARA REALIZAR ESTA ACCION");
    }
  } catch (e: any) {
    handleError(res, "SESSION NO VALIDA", e);
  }
};

const isAdmin = async ({ idUser }: RequestExt, res: Response, next: NextFunction) => {
  try {
    const idU = idUser?.idUser;

    const checkIs = await UserModel.findOne({ _id: idU });

    if (checkIs && checkIs.rol == Rol.ADMIN) {
      next();
    } else {
      throw Error("NO TIENE PERMISOS PARA REALIZAR ESTA ACCION");
    }
  } catch (e: any) {
    handleError(res, "SESSION NO VALIDAD", e);
  }
};

export { checkJwt, isUser, isAdmin };
