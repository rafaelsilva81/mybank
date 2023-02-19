import { Router as expressRouter } from "express";
import { ZodError } from "zod";
import { CreateUserDto, LoginUserDto } from "../dto/user";
import { AppError } from "../errors/appError";
import { signJwtToken } from "../middlewares/signJwtToken";
import { AuthService } from "../services/authService";

const authRouter = expressRouter();
const authService = new AuthService();

authRouter.post("/register", async (req, res) => {
  try {
    const user = CreateUserDto.parse(req.body);

    const newUser = await authService.registerUser(user);

    res.status(201).json(newUser);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Invalid data" });
    } else if (error instanceof AppError) {
      res.status(error.status).json({ message: error.message });
    }
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const user = LoginUserDto.parse(req.body);

    const loggedUser = await authService.loginUser(user);
    const token = await signJwtToken(loggedUser.id);

    res.status(200).json({
      ...loggedUser,
      token,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Invalid data" });
    } else if (error instanceof AppError) {
      res.status(error.status).json({ message: error.message });
    }
  }
});

export default authRouter;
