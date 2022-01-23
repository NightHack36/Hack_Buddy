import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/Navbar";

const createHackathon = () => {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    minParticipantCount: "",
    maxParticipantCount: "",
  });

  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleDateChange = ({ currentTarget: input }) => {
    setDate({ ...date, [input.name]: input.value });
    console.log(input.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(date.startDate, date.endDate);
      const dateObject = {
        ...data,
        startTime: new Date(date.startDate).getTime(),
        endTime: new Date(date.endDate).getTime(),
        organizerId: localStorage.getItem("userId"),
        minParticipantCount: Number(data.minParticipantCount),
        maxParticipantCount: Number(data.maxParticipantCount),
      };

      console.log(dateObject);

      const url = `http://localhost:8080/api/infra/hackathon/create`;
      const { data: res } = await axios.post(url, dateObject, {
        headers: { authorization: localStorage.getItem("token") },
      });

      router.push("/main");
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
    <>
      <Navbar />
      <section className="overflow-hidden">
        <div className="flex min-h-screen overflow-hidden">
          <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
            <div className="absolute inset-0 object-cover w-full h-full bg-white">
              <Image
                src="/static/img/hackathon-create.svg"
                alt=""
                layout="fill"
              />
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
                  Create Hackathon.{" "}
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
                        for="name"
                        className="block text-sm font-medium text-neutral-600">
                        {" "}
                        Name{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autocomplete="text"
                          value={data.name}
                          onChange={handleChange}
                          required
                          placeholder="Name"
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
                        for="startDate"
                        className="block text-sm font-medium text-neutral-600">
                        {" "}
                        Start Time{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          id="startDate"
                          name="startDate"
                          value={date.startDate}
                          type="datetime-local"
                          autocomplete="datetime"
                          required
                          placeholder="Start Date"
                          onChange={handleDateChange}
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
                        for="endDate"
                        className="block text-sm font-medium text-neutral-600">
                        {" "}
                        End Time{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          id="endDate"
                          name="endDate"
                          value={date.endDate}
                          type="datetime-local"
                          autocomplete="datetime"
                          required
                          placeholder="End Date"
                          onChange={handleDateChange}
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
                        for="minParticipantCount"
                        className="block text-sm font-medium text-neutral-600">
                        {" "}
                        Minimum Participant Count{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          id="minParticipantCount"
                          name="minParticipantCount"
                          type="number"
                          autocomplete="number"
                          required
                          onChange={handleChange}
                          value={data.minParticipantCount}
                          placeholder="0"
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
                        for="maxParticipantCount"
                        className="block text-sm font-medium text-neutral-600">
                        {" "}
                        Maximum Participant Count{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          id="maxParticipantCount"
                          name="maxParticipantCount"
                          type="number"
                          autocomplete="number"
                          required
                          onChange={handleChange}
                          value={data.maxParticipantCount}
                          placeholder="0"
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
                      {/* <Link href="/login"> */}
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
                        Create Hackathon{" "}
                      </button>
                      {/* </Link> */}
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
    </>
  );
};

export default createHackathon;
