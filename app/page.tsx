"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Add your sign-in logic here using the email and password state values
    console.log("Signing in with:", email, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="mx-auto w-full sm:max-w-lg">
        <div className="p-5 first-letter:bg-white shadow-lg w-full rounded-lg divide-y divide-gray-200">
          <div className="text-center mx-auto my-auto flex flex-col mb-4">
            <h1 className="text-grey-700 text-xl font-bold">
              👋 Hello! Welcome to ProEvent!{" "}
            </h1>
            <p className="pt-2 text-gray-500">SignIn Using</p>
          </div>
          <div className="pt-4 divide-y divide-gray-200">
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-medium"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <button
                type="button"
                className="gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center"
              >
                <div className="flex align-items-center gap-1 justify-center mx-auto">
                  <FcGoogle className="text-xl my-auto" />
                  <p className="my-auto">Google</p>
                </div>
              </button>
              <button
                type="button"
                className="gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center"
              >
                <div className="flex align-items-center gap-1 justify-center mx-auto">
                  <AiFillGithub className="text-xl my-auto text-black" />
                  <p className="my-auto">Github</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
