import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "./database/users";
import { loginSchema } from "./schemas/auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      id: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Tu si musis spravit vybratie uzivatela z databazy a skontrolovanie prihlasovaci udajov
        let user = null;
        let body;
        try {
          body = await loginSchema.validate(credentials);
        } catch {
          return null;
        }

        // logic to verify if the user exists
        user = await User.findOne({ where: { email: body.email } });

        // Ak nenaslo uzivatela tak hod error
        if (!user) {
          throw new Error("Invalid credentials.");
        }

        // Ak ho naslo uzivatela so spravnym heslom vrat data ku ktorym chces mat pristup
        if (bcrypt.compareSync(body.password, user?.passwordHash)) return user;
        return null;
      },
    }),
  ],
});
