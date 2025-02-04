import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SearchBar from "./searchbar";

const NavBar = () => {
  const router = useRouter();
  const { data } = useSession();
  console.log("data---------- ", data);

  const goToUpload = () => {
    router.push("/upload");
  };
  return (
    <div>
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-3xl font-bold text-white whitespace-nowrap">
            StreamTube
          </span>

          {/* <SearchBar/> */}

          <div
            className="hidden w-full md:flex md:items-center md:w-auto"
            id="navbar-default"
          >
            {data ? (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={goToUpload}
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-sm px-6 py-3 m-2 transition transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Upload
                </button>

                <button
                  type="button"
                  onClick={signOut}
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-sm px-6 py-3 m-2 transition transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Sign Out
                </button>

                <span className="text-white mx-4">Hello, {data.user.name}</span>

                <div className="m-1">
                  <img
                    className="w-12 h-12 rounded-full border-2 border-gray-700 hover:border-blue-300 transition duration-300 shadow-md hover:shadow-lg"
                    src={data.user.image}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={signIn}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-sm px-6 py-3 transition transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
