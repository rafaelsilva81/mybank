import { prisma } from '../../src/config/prisma'
import { hashPassword } from '../../src/middlewares/hashPassword'
import { AuthService } from '../../src/services/authService'

const authService = new AuthService()
jest.retryTimes(2)

const testUser = {
  name: 'Teste usuario 2',
  email: 'teste12345789@email.com',
  password: 'teste123',
}

const wrongCredentials = {
  email: 'wrongemail@example.com',
  password: 'wrongpassword',
}

describe('Login', () => {
  test('Should login a user', async () => {
    const user = await authService.loginUser(testUser)
    expect(user).toMatchObject({
      id: expect.any(String),
      name: testUser.name,
      email: testUser.email,
      password: expect.any(String),
      avatar: null,
    })
  })

  test('Should not login a user with wrong credentials', async () => {
    await expect(authService.loginUser(wrongCredentials)).rejects.toThrow()
  })
})

beforeAll(async () => {
  await prisma.user.deleteMany()
  await prisma.user.create({
    data: {
      ...testUser,
      password: await hashPassword(testUser.password),
    },
  })
})
