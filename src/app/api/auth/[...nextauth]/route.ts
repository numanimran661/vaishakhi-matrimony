// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// // Remove console.log in production
// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error('Missing Google OAuth Credentials');
// }

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (account && user) {
//         return {
//           ...token,
//           accessToken: account.access_token,
//           id: user.id,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/auth/signin', // Custom sign-in page
//     error: '/auth/error', // Error page
//   },
// };

// export const { auth, handlers: { GET, POST } } = NextAuth(authOptions);


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { NextAuthOptions } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (account && user) {
//         return {
//           ...token,
//           accessToken: account.access_token,
//           id: user.id,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.accessToken = token.accessToken as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },
// };

// const handler = NextAuth(authOptions);

// export async function GET(req: NextRequest) {
//   return handler(req) as unknown as NextResponse;
// }

// export async function POST(req: NextRequest) {
//   return handler(req) as unknown as NextResponse;
// }
