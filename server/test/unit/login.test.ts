import { AuthService } from "../../src/services/authService";
import { prisma } from "../../src/config/prisma";
import { hashPassword } from "../../src/middlewares/hashPassword";

const authService = new AuthService();
jest.retryTimes(2);

const testUser = {
  name: "Teste usuario 2",
  email: "teste12345789@email.com",
  password: "teste123",
};

describe("Login", () => {
  test("Should login a user", async () => {
    const user = authService.loginUser(testUser);
    expect(user).resolves.toMatchObject({
      id: expect.any(String),
      name: testUser.name,
      email: testUser.email,
      password: expect.any(String),
      picture: null,
    });
  });
});

beforeAll(async () => {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      ...testUser,
      password: await hashPassword(testUser.password),
    },
  });
});
