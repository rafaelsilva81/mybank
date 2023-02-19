import express from "express";
import { env } from "./config/env";
import morgan from "morgan";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import authRouter from "./routes/authRouter";

const app = express();

async function bootstrap() {
  // Middleware
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(cors({ exposedHeaders: "Authorization" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    jwt({
      secret: Buffer.from(env.JWT_SECRET, "base64"),
      algorithms: ["HS256"],
      maxAge: "1d",
    }).unless({ path: ["/auth/login", "/auth/register"] })
  );

  // Routes
  app.use("/auth", authRouter);
  app.use("/protected", (req, res) => {
    res.status(200).json({ message: "This is supposed to be protected!" });
  });

  // Start server
  app.listen(env.PORT, () => {
    console.debug(`Server is running on port http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
});

export default app;
