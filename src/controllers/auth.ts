import { Request, Response } from "express";
import { LoginResponse, PostResponse } from "../type";
import { loginService, registerService } from "../services/auth";
import { handleError } from "../utils/error.handle";

const login = async ({ body }: Request, res: Response) => {
  try {
    const { user, password } = body;
    const userToken = await loginService({ user, password });
    const response: LoginResponse = {
      status: 200,
      token: userToken,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR LOGIN", e);
  }
};

const register = async ({ body }: Request, res: Response) => {
  try {
    const user = await registerService(body);

    const response: Partial<PostResponse> = {
      status: 200,
      user: user,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REGISTRO", e);
  }
};

export { login, register };
