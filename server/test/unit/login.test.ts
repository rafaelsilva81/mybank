/* eslint-disable @typescript-eslint/no-empty-function */
import { prisma } from '../../src/config/prisma'
import { hashPassword } from '../../src/middlewares/hashPassword'
import { AuthService } from '../../src/services/authService'

/* 
  This file contains unit tests for the login functionallity.
  It will use the AuthService to test the login functionallity.
  This does not test the routes, only the business logic.
*/

const authService = new AuthService()

const testUser = {
  name: 'Teste usuario 2',
  email: 'logintest@gmail.com',
  password: 'teste123',
}

const wrongCredentials = {
  email: 'wrongemail@example.com',
  password: 'wrongpassword',
}

beforeAll(async () => {
  await prisma.user.create({
    data: {
      ...testUser,
      password: await hashPassword(testUser.password),
    },
  })
})

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
