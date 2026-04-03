import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/validators/auth";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 31536000,
    updateAge: 86400,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsed = authSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: parsed.data.email.toLowerCase(),
          },
          include: {
            profile: true,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatches = await compare(
          parsed.data.password,
          user.passwordHash,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          setupCompleted: user.profile?.setupCompleted ?? false,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.setupCompleted = user.setupCompleted ?? false;
      }

      if (trigger === "update" && token.sub) {
        const currentUser = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            email: true,
            name: true,
            image: true,
            profile: {
              select: {
                setupCompleted: true,
              },
            },
          },
        });

        if (currentUser) {
          token.email = currentUser.email;
          token.name = currentUser.name;
          token.picture = currentUser.image;
          token.setupCompleted = currentUser.profile?.setupCompleted ?? false;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.email = typeof token.email === "string" ? token.email : "";
        session.user.name = typeof token.name === "string" ? token.name : null;
        session.user.image = typeof token.picture === "string" ? token.picture : null;
        session.user.setupCompleted = token.setupCompleted === true;
      }

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut, unstable_update } =
  NextAuth(authConfig);
export const { GET, POST } = handlers;
