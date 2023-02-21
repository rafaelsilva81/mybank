/* eslint-disable @typescript-eslint/no-empty-function */
import eventEmitter from '../../src/config/events'
import { prisma } from '../../src/config/prisma'
import { hashPassword } from '../../src/middlewares/hashPassword'
import { AuthService } from '../../src/services/authService'

/* 
  This file contains unit tests for the register functionallity.
  It will use the AuthService to test the register functionallity.
  This does not test the routes, only the business logic.
*/
const authService = new AuthService()

const testUser = {
  name: 'Teste',
  email: 'registertest@gmail.com',
  password: '12345678',
}

const duplicatedUser = {
  name: 'duplicate',
  email: 'duplicate@email.com',
  password: '12345678',
}

beforeAll(async () => {
  await prisma.user.create({
    data: {
      ...duplicatedUser,
      password: await hashPassword(duplicatedUser.password),
    },
  })
})

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
