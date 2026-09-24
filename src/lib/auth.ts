import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
   emailAndPassword: {
    enabled: true,
  },
   user: {
    additionalFields: {
      role: {
        type :"string",
        defaultValue: "client",
        input: true,
      },
    },
  },
  plugins:[admin()]
});


