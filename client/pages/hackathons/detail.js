import React from "react";

const Detail = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight pt-20 pb-0 text-center sm:text-5xl dark:text-coolGray-50 ">
        Hackathon 1
      </h2>
      <div
        class="overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
        <div
          class="
          flex
          items-end
          justify-center
          min-h-screen
          px-4
          
          pb-20
          text-center
          sm:block sm:p-0
        ">
          <div
            class="transition-opacity bg-gray-500 bg-opacity-75"
            aria-hidden="true"></div>
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            ​
          </span>

          <div
            class="
            inline-block
            p-5
            overflow-hidden
            text-left
            align-bottom
            transition-all
            transform
            bg-white
            rounded-lg
            shadow-2xl
            lg:p-16
            sm:my-8 sm:align-middle sm:max-w-xl sm:w-full
          ">
            <div>
              <div class="mt-3 text-left sm:mt-5">
                <h1
                  class="
                  mb-8
                  text-2xl
                  font-semibold
                  leading-none
                  tracking-tighter
                  text-neutral-600
                ">
                  {" "}
                  Organized By{" "}
                </h1>
                <p class="mx-auto text-base leading-relaxed text-gray-500">
                  {" "}
                  Start Date
                </p>
                <p class="mx-auto text-base leading-relaxed text-gray-500">
                  {" "}
                  End Date
                </p>
                <p class="mx-auto text-base leading-relaxed text-gray-500">
                  {" "}
                  Details
                </p>
              </div>
            </div>
            <div class="mt-6 sm:flex">
              <div class="mt-3 rounded-lg sm:mt-0">
                <button
                  class="
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
                  {" "}
                  Create Team{" "}
                </button>
              </div>
              <div class="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                <button
                  class="
                  items-center
                  block
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
                  Join Team{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
