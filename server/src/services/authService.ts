import { z } from "zod";
import { prisma } from "../config/prisma";
import { CreateUserDto, LoginUserDto } from "../dto/user";
import { checkPassword } from "../middlewares/checkPassword";
import { hashPassword } from "../middlewares/hashPassword";
import eventEmitter from "../config/events";
import InternalError from "../errors/other/internalError";
import LoginError from "../errors/auth/loginError";
import RegisterError from "../errors/auth/registerError";

export class AuthService {
  async registerUser(user: z.infer<typeof CreateUserDto>) {
    const hashed = await hashPassword(user.password);

    try {
      const checkUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (checkUser) {
        throw new RegisterError("E-mail já cadastrado");
      }

      const newUser = await prisma.user.create({
        data: {
          ...user,
          password: hashed,
        },
      });

      eventEmitter.emit("register", newUser);

      return newUser;
    } catch (error) {
      if (error instanceof RegisterError) {
        throw error;
      }
      console.error(error);
      throw new InternalError("Houve um erro ao registrar o usuário");
    }
  }

  async loginUser(user: z.infer<typeof LoginUserDto>) {
    try {
      const checkUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!checkUser) {
        throw new LoginError("E-mail ou senha incorretos 1");
      }

      const checkPasswordResult = checkPassword(
        user.password,
        checkUser.password
      );

      if (!checkPasswordResult) {
        throw new LoginError("E-mail ou senha incorretos 2");
      }

      return checkUser;
    } catch (error) {
      if (error instanceof LoginError) {
        throw error;
      }
      console.error(error);
      throw new InternalError("Houve um erro ao logar o usuário");
    }
  }
}
