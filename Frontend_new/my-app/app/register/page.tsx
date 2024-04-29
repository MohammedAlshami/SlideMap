"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import MainLayout from "@/app/components/MainLayout";
// import { useRouter } from "next/navigation";
import { redirect, useRouter } from "next/navigation";
import { checkSessionAuthCookie } from "../components/Controllers/Cookies";

// import signInWithGoogle from "../components/Controllers/Firebase"
import signInWithGoogle from "../components/Controllers/Firebase/GmailLogin";

const page = () => {
  interface CreateAccountProps {
    email: string;
    password: string;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState("");
  const [isAuthenticated, setAuthentication] = useState(false);

  const router = useRouter();
  // const router = useRouter();
  useEffect(() => {
    if (checkSessionAuthCookie()) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("An error occurred while creating the account.");
        return;
      }

      const data = await response.json();
      if (data.authenticated) {
        document.cookie = `session_auth=${email}; path=/`;
        setAuthentication(true);
        router.push("/");
      } else {
        setError(data.error);
      }

 
    } catch (error) {
      console.error("Error creating account:", error);
      setError("An error occurred while creating the account.");
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const user = await signInWithGoogle();
    document.cookie = `session_auth=${user["email"]}`;
    setAuthentication(true);
    router.push("/");
    // if (user) {

    // }
  };
  return (
    <>
      <MainLayout>
        <section className="px-4 py-24 mx-auto  mt-12">
          <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
            <h1 className="text-4xl font-semibold text-center text-gray-900">
              Register
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="pb-6 space-y-2 border-b border-gray-200">
              <a
                href="#"
                className="w-full py-3 btn btn-icon btn-google"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-1"
                >
                  <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z" />
                </svg>
                Continue with Google
              </a>
              <a href="#" className="w-full py-3 btn btn-icon btn-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-1"
                >
                  <path d="M19.665,16.811c-0.287,0.664-0.627,1.275-1.021,1.837c-0.537,0.767-0.978,1.297-1.316,1.592	c-0.525,0.482-1.089,0.73-1.692,0.744c-0.432,0-0.954-0.123-1.562-0.373c-0.61-0.249-1.17-0.371-1.683-0.371	c-0.537,0-1.113,0.122-1.73,0.371c-0.616,0.25-1.114,0.381-1.495,0.393c-0.577,0.025-1.154-0.229-1.729-0.764	c-0.367-0.32-0.826-0.87-1.377-1.648c-0.59-0.829-1.075-1.794-1.455-2.891c-0.407-1.187-0.611-2.335-0.611-3.447	c0-1.273,0.275-2.372,0.826-3.292c0.434-0.74,1.01-1.323,1.73-1.751C7.271,6.782,8.051,6.563,8.89,6.549	c0.46,0,1.063,0.142,1.81,0.422s1.227,0.422,1.436,0.422c0.158,0,0.689-0.167,1.593-0.498c0.853-0.307,1.573-0.434,2.163-0.384	c1.6,0.129,2.801,0.759,3.6,1.895c-1.43,0.867-2.137,2.08-2.123,3.637c0.012,1.213,0.453,2.222,1.317,3.023	c0.392,0.372,0.829,0.659,1.315,0.863C19.895,16.236,19.783,16.529,19.665,16.811L19.665,16.811z M15.998,2.38	c0,0.95-0.348,1.838-1.039,2.659c-0.836,0.976-1.846,1.541-2.941,1.452c-0.014-0.114-0.021-0.234-0.021-0.36	c0-0.913,0.396-1.889,1.103-2.688c0.352-0.404,0.8-0.741,1.343-1.009c0.542-0.264,1.054-0.41,1.536-0.435	C15.992,2.127,15.998,2.254,15.998,2.38L15.998,2.38z" />
                </svg>
                Continue with Facebook
              </a>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block w-full">
                <span className="block mb-1 text-md font-medium text-gray-700">
                  Email
                </span>
                <input
                  className="form-input w-full px-2 py-4 rounded-lg border-gray-200 border-2"
                  type="email"
                  placeholder="Ex. james@bond.com"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="block">
                <span className="block mb-1 text-md font-medium text-gray-700">
                  Password
                </span>
                <input
                  className="form-input w-full px-2 py-4 rounded-lg border-gray-200 border-2"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="block mb-1 text-md font-medium text-gray-700">
                  Confirm Password
                </span>
                <input
                  className="form-input w-full px-2 py-4 rounded-lg border-gray-200 border-2"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <input
                type="submit"
                className="w-full btn btn-primary btn-lg"
                value="Sign In"
              />
            </form>
            <p className="my-8 text-xs font-medium text-center text-gray-700">
              By clicking "Sign Up" you agree to our
              <a href="#" className="text-purple-700 hover:text-purple-900">
                Terms of Service
              </a>
              and
              <a href="#" className="text-purple-700 hover:text-purple-900">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default page;
