import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EnterPassword = () => {
  const [data, setData] = useState({
    newPassword: "",
  });

  const router = useRouter();

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const userId = localStorage.getItem("userId");
      const url = `http://localhost:8080/api/infra/user/${userId}/reset-password`;
      console.log(data);

      const { data: res } = await axios.post(url, data, {
        headers: { authorization: localStorage.getItem("token") },
      });

      router.push("/login");
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
      <div class="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-3xl font-extrabold text-center text-neutral-600">
            {" "}
            Enter New Password{" "}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="px-4 py-8 sm:px-10">
            <div class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="newPassword"
                  class="block text-sm font-medium text-gray-700">
                  {" "}
                  Enter your password{" "}
                </label>
                <div class="mt-1">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autocomplete="newPassword"
                    required
                    value={data.value}
                    onChange={handleChange}
                    class="
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
                <button
                  type="submit"
                  class="
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
                  Reset My Password{" "}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnterPassword;
