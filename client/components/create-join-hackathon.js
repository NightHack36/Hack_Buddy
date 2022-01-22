import React from "react";
import Link from "next/link";

const CreateJoinHackathon = () => {
  return (
    <section>
      <div class="relative items-center w-full mx-auto md:px-12 lg:px-16 max-w-7xl">
        <div class="max-w-2xl px-4 py-24 mx-auto sm:px-6 lg:px-8">
          <div
            class="
              justify-center
              mx-auto
              space-y-4
              sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6
              lg:mx-auto
              xl:max-w-2xl xl:mx-0 xl:grid-cols-2
            ">
            <div class="bg-gray-50 rounded-xl">
              <div class="p-6 text-center">
                <h2 class="text-lg font-medium leading-6 text-neutral-600">
                  {" "}
                  Organizers{" "}
                </h2>
                <p class="mt-8 text-4xl">
                  <span class="font-black text-blue-600 uppercase">
                    Create Hackathon
                  </span>
                </p>
                <div class="mt-6">
                  <Link href="/hackathons/create">
                    <a
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
                      Click Here
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-xl">
              <div class="p-6 text-center">
                <h2 class="text-lg font-medium leading-6 text-neutral-600">
                  {" "}
                  Participants{" "}
                </h2>
                <p class="mt-8 text-4xl">
                  <span class="font-black text-gray-500 uppercase">
                    Find Hackathons
                  </span>
                </p>
                <div class="mt-6">
                  <Link href="/hackathons/search">
                    <a
                      class="
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
                      Search Here
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateJoinHackathon;
