import { PrismaClient } from '@prisma/client'

import { env } from './env'

/* 
  This file will configure a default prisma client.
  It will also cache the client in the global object.
*/

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
