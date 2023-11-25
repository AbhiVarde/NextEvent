"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { account, ID } from "./appwrite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (email: any, password: any) => {
    try {
      const session = await account.createEmailSession(email, password);
      setLoggedInUser(await account.get());
    } catch (error) {
      toast.error("Error signing in. Please check your credentials.");
    }
  };

  const handleSignUp = async () => {
    if (!credentials.email || !credentials.password || !credentials.name) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    try {
      await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.name
      );
      handleSignIn(credentials.email, credentials.password);
    } catch (error) {
      toast.error("Error signing up. Please try again.");
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgba(0,0,0,0.1)] flex flex-col justify-center">
      <ToastContainer />
      <div className="px-5 rounded-lg sm:px-10 md:px-0 mx-auto w-full sm:max-w-lg bg-white">
        <div className="p-5 first-letter:bg-white shadow-lg w-full rounded-lg divide-y divide-gray-200">
          <div className="text-center mx-auto my-auto flex flex-col mb-4">
            <h1 className="text-grey-700 text-lg sm:text-xl font-bold">
              👋 Hello! Welcome to ProEvent!
            </h1>
            <p className="pt-2 text-sm sm:text-base text-gray-500">
              SignIn Using
            </p>
          </div>
          <div className="pt-4 divide-y divide-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn(credentials.email, credentials.password);
              }}
            >
              {["name", "email", "password"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    {field === "email"
                      ? "Email"
                      : field === "password"
                      ? "Password"
                      : "Name"}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "password"
                        ? "password"
                        : "text"
                    }
                    name={field}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder={`Enter your ${field}`}
                    value={credentials[field as keyof typeof credentials]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
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
              {[
                {
                  icon: <FcGoogle className="text-xl my-auto" />,
                  text: "Google",
                },
                {
                  icon: <AiFillGithub className="text-xl my-auto text-black" />,
                  text: "Github",
                },
              ].map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  className="gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center"
                >
                  <div className="flex align-items-center gap-1 justify-center mx-auto">
                    {provider.icon}
                    <p className="my-auto">{provider.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 flex justify-center items-center divide-x-2 text-sm gap-2">
            <p className="text-gray-500">Don't have an account?</p>
            <div className="divide-x">
              <button
                className="text-black hover:underline font-medium px-2"
                onClick={handleSignUp}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
