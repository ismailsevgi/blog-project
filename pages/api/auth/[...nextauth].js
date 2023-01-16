import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import connectingMongoDB from '../../../utils/connectMongo';
import User from '../../../utils/models/userSchema';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        console.log('req.body.csrfToken: ', req.body.csrfToken);
        console.log('credentials: ', credentials);

        await connectingMongoDB().catch((err) => {
          return { error: 'Mongodb connection failed!' };
        });

        const result = await User.findOne({
          username: credentials.username,
          password: credentials.password,
        });

        console.log('result: ', result);

        if (!result) throw new Error('Böyle bir admin yok, hiç var olmadı');

        return {
          _id: result._id,
          username: result.username,
          role: result.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
});
