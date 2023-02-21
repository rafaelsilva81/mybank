import { User } from '@prisma/client'

import { prisma } from '../config/prisma'

/* 
  This is a subscriber that will be called when the register event is emitted.
  It will create a default account for the user. 
*/

export default async (user: User) => {
  await prisma.account.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      balance: 0,
    },
  })

  console.debug('✅ Default account created for user', user.id)
}
