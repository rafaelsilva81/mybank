import { User } from "@prisma/client";
import { prisma } from "../config/prisma";

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
  });

  console.debug("✅ Default account created for user", user.id);
};
