import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/infra/user/login";

      const { data: res } = await axios.post(url, data);
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id);

      if (res.user.status === "FTL") {
        router.push("/new-password");
      } else {
        router.push("/main");
      }

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
    <section>
      <div className="flex min-h-screen overflow-hidden">
        <div
          className="
            flex flex-col
            justify-center
            flex-1
            px-4
            py-12
            sm:px-6
            lg:flex-none lg:px-20
            xl:px-24
          ">
          <div className="w-full max-w-xl mx-auto lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
                {" "}
                Sign in.{" "}
              </h2>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6">
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
                        value={data.email}
                        autocomplete="email"
                        required=""
                        placeholder="Your Email"
                        onChange={handleChange}
                        className=" block
                          w-full
                          px-5
                          py-3
                          text-base
                          placeholder-gray-300
                          transition
                          duration-500
                          ease-in-out
                          transform
                          border border-transparent
                          rounded-lg
                          text-neutral-600
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
                        value={data.password}
                        type="password"
                        autocomplete="current-password"
                        required=""
                        placeholder="Your Password"
                        onChange={handleChange}
                        className="
                          block
                          w-full
                          px-5
                          py-3
                          text-base
                          placeholder-gray-300
                          transition
                          duration-500
                          ease-in-out
                          transform
                          border border-transparent
                          rounded-lg
                          text-neutral-600
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
                      <Link href="/reset-password">
                        <a className="font-medium text-blue-600 hover:text-blue-500">
                          {" "}
                          Forgot your password?{" "}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div>
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
                      Sign in{" "}
                    </button>
                  </div>
                </form>
                {/* <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-neutral-600"> Or continue with </span>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="
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
        <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
          <div className="absolute inset-0 object-cover w-full h-full">
            <Image src="/static/img/signin.svg" alt="" layout="fill" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
