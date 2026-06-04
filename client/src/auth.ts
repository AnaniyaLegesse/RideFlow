import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByCredentials } from '@/lib/authUsers';

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials) {
        const email = String(credentials?.email ?? '');
        const password = String(credentials?.password ?? '');

        // TODO: Replace this hardcoded/in-memory lookup with a database-backed user lookup.
        const user = findUserByCredentials(email, password);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && 'role' in user) {
        token.role = String(user.role);
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = String(token.role ?? '');
      }

      return session;
    },
  },
});
