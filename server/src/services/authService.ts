import { z } from "zod";
import { prisma } from "../config/prisma";
import { CreateUserDto, LoginUserDto } from "../dto/user";
import { checkPassword } from "../middlewares/checkPassword";
import { hashPassword } from "../middlewares/hashPassword";
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
        console.log(checkUser);
        throw new RegisterError("E-mail já cadastrado");
      }

      const newUser = await prisma.user.create({
        data: {
          ...user,
          password: hashed,
        },
      });

      return newUser;
    } catch (error) {
      console.error(error);
      throw new InternalError("Houve um erro ao registrar o usuário");
    }
  }

  async loginUser(user: z.infer<typeof LoginUserDto>) {
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!foundUser) {
        throw new LoginError("E-mail e/ou senha incorretos");
      }

      const isMatch = await checkPassword(user.password, foundUser.password);

      if (!isMatch) {
        throw new LoginError("E-mail e/ou senha incorretos");
      }

      return foundUser;
    } catch (error) {
      console.error(error);
      throw new InternalError("Houve um erro ao logar o usuário");
    }
  }
}
