import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import { api } from "~/utils/api";
import { User } from "@clerk/nextjs/server";

export default function Home() {
  const user = useUser();

  console.log(User);
  //log user for id
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
            Create{" "}
            <span className="text-[hsl(280,100%,70%)]">T3 full stack</span> App
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
            {data?.map((post) => (
              <div key={post.id} className="text-5xl">
                {post.email && <span>{post.email}</span>}
              </div>
            ))}
          </div>
          <div>
            {data?.map((post) => (
              <div key={post.id}>{post.name && <span>{post.name}</span>}</div>
            ))}
          </div>
          <div>
            {data?.map((post) => (
              <div key={post.id}>
                {post.content && <span>{post.content}</span>}
              </div>
            ))}
          </div>
          <SignIn path="/sign-in" routing="path" afterSignUpUrl="/sign-up" />
        </div>
      </main>
    </>
  );
}
