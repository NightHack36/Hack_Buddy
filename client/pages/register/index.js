import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/infra/user";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
    } catch (err) {
      if (err) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(err.response.data.message);
        }
      }
    }
  };

  return (
    <section className="overflow-hidden">
      <div className="flex min-h-screen overflow-hidden">
        <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
          <div className="absolute inset-0 object-cover w-full h-full bg-white">
            <Image src="/static/img/signup.svg" alt="" layout="fill" />
          </div>
        </div>
        <div
          className="
            flex flex-col
            justify-center
            flex-1
            px-4
            py-12
            overflow-hidden
            sm:px-6
            lg:flex-none lg:px-20
            xl:px-24
          ">
          <div className="w-full max-w-xl mx-auto lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
                {" "}
                Sign up.{" "}
              </h2>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}>
                  <div>
                    <label
                      for="firstName"
                      className="block text-sm font-medium text-neutral-600">
                      {" "}
                      First Name{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autocomplete="text"
                        required
                        placeholder="First Name"
                        value={data.firstName}
                        onChange={handleChange}
                        className="
                          block
                          w-full
                          px-5
                          py-3
                          text-base text-neutral-600
                          placeholder-gray-300
                          transition
                          duration-500
                          ease-in-out
                          transform
                          border border-transparent
                          rounded-lg
                          bg-gray-50
                          focus:outline-none
                          focus:border-transparent
                          focus:ring-2
                          focus:ring-white
                          focus:ring-offset-2
                          focus:ring-offset-gray-300
                        "
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="lastName"
                      className="block text-sm font-medium text-neutral-600">
                      {" "}
                      Last Name{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastName"
                        name="lastName"
                        value={data.lastName}
                        type="text"
                        autocomplete="text"
                        required
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="
                          block
                          w-full
                          px-5
                          py-3
                          text-base text-neutral-600
                          placeholder-gray-300
                          transition
                          duration-500
                          ease-in-out
                          transform
                          border border-transparent
                          rounded-lg
                          bg-gray-50
                          focus:outline-none
                          focus:border-transparent
                          focus:ring-2
                          focus:ring-white
                          focus:ring-offset-2
                          focus:ring-offset-gray-300
                        "
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block text-sm font-medium text-neutral-600">
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Your Email"
                        className="
                          block
                          w-full
                          px-5
                          py-3
                          text-base text-neutral-600
                          placeholder-gray-300
                          transition
                          duration-500
                          ease-in-out
                          transform
                          border border-transparent
                          rounded-lg
                          bg-gray-50
                          focus:outline-none
                          focus:border-transparent
                          focus:ring-2
                          focus:ring-white
                          focus:ring-offset-2
                          focus:ring-offset-gray-300
                        "
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      for="password"
                      className="block text-sm font-medium text-neutral-600">
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        autocomplete="current-password"
                        required
                        onChange={handleChange}
                        placeholder="Your Password"
                        className="
                          block
                          w-full
                          px-5
                          py-3
                          text-base text-neutral-600
                          placeholder-gray-300
                          transition
                          duration-500
                          ease-in-out
                          transform
                          border border-transparent
                          rounded-lg
                          bg-gray-50
                          focus:outline-none
                          focus:border-transparent
                          focus:ring-2
                          focus:ring-white
                          focus:ring-offset-2
                          focus:ring-offset-gray-300
                        "
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        placeholder="Your password"
                        className="
                          w-4
                          h-4
                          text-blue-600
                          border-gray-200
                          rounded
                          focus:ring-blue-500
                        "
                      />
                      <label
                        for="remember-me"
                        className="block ml-2 text-sm text-neutral-600">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link href="/forgot-password">
                        <a className="font-medium text-blue-600 hover:text-blue-500">
                          {" "}
                          Forgot your password?{" "}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <Link href="/login">
                      <button
                        type="submit"
                        className="
                        flex
                        items-center
                        justify-center
                        w-full
                        px-10
                        py-4
                        text-base
                        font-medium
                        text-center text-white
                        transition
                        duration-500
                        ease-in-out
                        transform
                        bg-blue-600
                        rounded-xl
                        hover:bg-blue-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-blue-500
                      ">
                        {" "}
                        Sign up{" "}
                      </button>
                    </Link>
                  </div>
                </form>
                {/* <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-neutral-600 bg-white">
                      {" "}
                      Or continue with{" "}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="
                      w-full
                      items-center
                      block
                      px-10
                      py-3.5
                      text-base
                      font-medium
                      text-center text-blue-600
                      transition
                      duration-500
                      ease-in-out
                      transform
                      border-2 border-white
                      shadow-md
                      rounded-xl
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-gray-500
                    ">
                    <div className="flex items-center justify-center">
                      <span className="ml-4"> Log in with Google</span>
                    </div>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
