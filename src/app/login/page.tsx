import React from "react";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello world");
  };

  return (
    <div className="bg-color5 flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-color4 shadow-lg rounded-2xl p-8">
          <img
            className="mx-auto h-14 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt="User Icon"
          />

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>

          <form className="space-y-6 mt-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="px-3 py-3 mt-1 block w-full rounded-md border border-color2 bg-color5 text-white shadow-sm focus:border-color1 focus:ring-color1 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-3 py-3 mt-1 block w-full rounded-md border border-color2 bg-color5 text-white shadow-sm focus:border-color1 focus:ring-color1 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-color1 py-3 px-4 text-sm font-bold text-white shadow-md hover:bg-color2 focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 focus:ring-offset-color5"
              >
                Sign In
              </button>
            </div>
            <h2 className="text-center text-sm text-white">
              Não possui uma conta?{" "}
              <Link
                className="text-color1 font-semibold hover:text-color2 hover:underline"
                href="/register"
              >
                Criar uma
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
