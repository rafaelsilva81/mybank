import eventEmitter from '../../src/config/events'
import { prisma } from '../../src/config/prisma'
import { hashPassword } from '../../src/middlewares/hashPassword'
import { AuthService } from '../../src/services/authService'

const authService = new AuthService()
jest.retryTimes(5)

const testUser = {
  name: 'Teste',
  email: 'teste123@gmal.com',
  password: '12345678',
}

const duplicatedUser = {
  name: 'duplicate',
  email: 'duplicate@email.com',
  password: '12345678',
}

describe('Register', () => {
  test('Should register a new user', async () => {
    const eventEmitterSpy = jest.spyOn(eventEmitter, 'emit')
    const user = await authService.registerUser(testUser)

    expect(user).toMatchObject({
      id: expect.any(String),
      name: testUser.name,
      email: testUser.email,
      password: expect.any(String),
      avatar: null,
    })

    expect(eventEmitterSpy).toHaveBeenCalledWith('register', user)
  })

  test('Should not register a new user with an existing email', async () => {
    const user = authService.registerUser(duplicatedUser)
    await expect(user).rejects.toThrow()
  })
})

beforeAll(async () => {
  await prisma.user.deleteMany()
  await prisma.user.create({
    data: {
      ...duplicatedUser,
      password: await hashPassword(duplicatedUser.password),
    },
  })
})
