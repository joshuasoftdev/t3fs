import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { post } from "../interfaces";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();
  const fetchedposts: any[] = /* Your fetched data */ [];
  const posts: post[] = fetchedposts as post[];

  const { data } = api.post.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed h-10 w-full bg-gradient-to-b from-[#589feb] to-[#76756e]">
        <div className="mr-4 flex justify-end pt-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#654395] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3 full</span> App
          </h1>
          <div>
            {!user.isSignedIn && (
              <h1 className="flex justify-center text-white"> Sign in </h1>
            )}
            {!!user.isSignedIn && (
              <h1 className="flex justify-center text-white"> Sign Out </h1>
            )}
            {!user.isSignedIn && (
              <SignInButton>
                <button className="flex w-20 justify-center rounded bg-white">
                  Sign In
                </button>
              </SignInButton>
            )}
            {!!user.isSignedIn && (
              <SignOutButton>
                <button className="w-20 rounded bg-white">Sign Out</button>
              </SignOutButton>
            )}
          </div>
          <div>
            {data?.map((User) => (
              <div key={User.id} className="text-5xl">
                {User.email && <span>{User.email}</span>}
              </div>
            ))}
          </div>
          <div>
            {data?.map((post) => (
              <div key={post.id}>{post.email && <span>{post.email}</span>}</div>
            ))}
          </div>
          <SignIn path="/sign-in" routing="path" afterSignUpUrl="/sign-up" />
        </div>
      </main>
    </>
  );
}
