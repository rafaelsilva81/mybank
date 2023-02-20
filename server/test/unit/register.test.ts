import { AuthService } from "../../src/services/authService";
import { prisma } from "../../src/config/prisma";
import { hashPassword } from "../../src/middlewares/hashPassword";

const authService = new AuthService();
jest.retryTimes(5);

const testUser = {
  name: "Teste",
  email: "teste123@gmal.com",
  password: "12345678",
};

const duplicatedUser = {
  name: "duplicate",
  email: "duplicate@email.com",
  password: "12345678",
};

describe("Register", () => {
  test("Should register a new user", async () => {
    const user = authService.registerUser(testUser);
    expect(user).resolves.toMatchObject({
      id: expect.any(String),
      name: testUser.name,
      email: testUser.email,
      password: expect.any(String),
      picture: null,
    });
  });

  test("Should not register a new user with an existing email", async () => {
    const user = authService.registerUser(duplicatedUser);
    expect(user).rejects.toThrowError();
  });
});

beforeAll(async () => {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      ...duplicatedUser,
      password: await hashPassword(duplicatedUser.password),
    },
  });
});
