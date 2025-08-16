import React from "react";
import Link from "next/link";

const SignupForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode lidar com envio do formulário, validações, etc.
  };

  return (
    <div className="bg-color5 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-color4 shadow-lg rounded-2xl p-6">
          <img
            className="mx-auto h-14 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt="User Icon"
          />

          <h2 className="my-4 text-center text-3xl font-bold tracking-tight text-white">
            Sign up for an account
          </h2>

          <form className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="px-3 py-3 mt-1 block w-full rounded-md border border-color2 bg-color5 text-white shadow-sm focus:border-color1 focus:ring-color1 sm:text-sm"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  className="px-3 py-3 mt-1 block w-full rounded-md border border-color2 bg-color5 text-white shadow-sm focus:border-color1 focus:ring-color1 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
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
                Register Account
              </button>
            </div>

            {/* Link Login */}
            <h2 className="text-center text-sm text-white">
              Já possui uma conta?{" "}
              <Link
                href="/login"
                className="text-color1 font-semibold hover:text-color2 hover:underline"
              >
                Login
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
