import { prisma } from '@repo/db';
import { Account, Profile, User, AuthOptions, SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session : {
        strategy: 'jwt' as SessionStrategy,
    },

    callbacks: {
        async jwt({ token, user }: {token: any; user?: User}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
        async signIn({ user, account, profile }: {user?: User, account: Account | null, profile?: Profile}) {
            // Check if the user exists in the database
            if(!profile) return false;

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: profile.email,
                },
            });

            // If the user doesn't exist, create a new user
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email: profile.email as string,
                        name: profile.name,
                    },
                });
            }

            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "ns4yyeTQHzH5lB7wlBdoKP7wnqdxyuoz"
}