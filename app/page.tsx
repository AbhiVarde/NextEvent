import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { VscWand } from "react-icons/vsc";
import { account, client } from "./appwrite";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      const redirectURL = `${window.location.origin}/auth/callback`; // Specify your callback URL
      const googleOAuthUrl = await client.account.createOAuth2Session(
        "google",
        redirectURL
      );
      window.location.href = googleOAuthUrl.toString();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const redirectURL = `${window.location.origin}/auth/callback`; // Specify your callback URL
      const githubOAuthUrl = await client.account.createOAuth2Session(
        "github",
        redirectURL
      );
      window.location.href = githubOAuthUrl.toString();
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  useEffect(() => {
    // Handle authentication callback (e.g., after successful Google or GitHub login)
    const handleAuthCallback = async () => {
      try {
        const session = await client.account.createOAuth2Session();
        await client.account.createOAuth2Account(
          session.oauth2.state,
          session.oauth2.code
        );
        // Redirect or handle the logged-in user as needed
      } catch (error) {
        console.error("Authentication callback error:", error);
      }
    };

    if (window.location.pathname === "/auth/callback") {
      handleAuthCallback();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="text-grey-700 mx-auto my-auto font-bold flex align-items-center justify-evenly py-5">
            Login Using
          </div>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                className="gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center"
                onClick={handleGoogleLogin}
              >
                <div className="flex align-items-center gap-1 justify-center mx-auto">
                  <FcGoogle className="text-xl my-auto" />
                  <p className="my-auto">Google</p>
                </div>
              </button>
              <button
                type="button"
                className="gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center"
                onClick={handleGithubLogin}
              >
                <div className="flex align-items-center gap-1 justify-center mx-auto">
                  <AiFillGithub className="text-xl my-auto text-black" />
                  <p className="my-auto">Github</p>
                </div>
              </button>
              <button
                type="button"
                className="gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center"
              >
                <div className="flex align-items-center gap-1 justify-center mx-auto">
                  <VscWand className="text-xl my-auto" />
                  <p className="my-auto">Magic URL</p>{" "}
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
