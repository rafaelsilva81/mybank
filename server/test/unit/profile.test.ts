/* eslint-disable @typescript-eslint/no-empty-function */

import { User } from '@prisma/client'

import { prisma } from '../../src/config/prisma'
import { hashPassword } from '../../src/middlewares/hashPassword'
import { UserService } from '../../src/services/userService'

/* 
  This file contains unit tests for the user service.
  More specifically, it will test the profile-related functions.
  This does not test the routes, only the business logic.
  This also means that authentication and authorization are not tested here.
*/
const userService = new UserService()

const testUser = {
  name: 'Teste',
  email: 'profiletest@gmail.com',
  password: '12345678',
}

let user: User

/* create default user */
beforeAll(async () => {
  user = await prisma.user.create({
    data: {
      ...testUser,
      password: await hashPassword(testUser.password),
    },
  })
})

describe('User profile tests', () => {
  test('Should update user name and email', async () => {
    const updatedUser = await userService.updateUser(user.id, {
      name: 'Teste 2',
      email: 'teste_atualizado@gmail.com',
    })

    expect(updatedUser).toMatchObject({
      id: user.id,
      name: 'Teste 2',
      email: 'teste_atualizado@gmail.com',
      password: expect.any(String),
      avatar: null,
    })
  })

  test('Should update user password', async () => {
    const newPass = '123456789'
    const updatedUser = await userService.updatePassword(user.id, {
      password: testUser.password,
      newPassword: newPass,
    })

    expect(updatedUser).toBeTruthy()
  })

  test('Should not update user password with wrong old password', async () => {
    const newPass = 'testando123'
    const updatedUser = userService.updatePassword(user.id, {
      password: 'wrongpassword',
      newPassword: newPass,
    })
    await expect(updatedUser).rejects.toThrow()
  }, 2000)
})
