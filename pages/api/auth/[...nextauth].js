import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectingMongoDB from '../../../utils/connectMongo';
import User from '../../../utils/models/userSchema';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        console.log('Request to auth: ', req);
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
  callbacks: {
    async session({ session, token }) {
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
