import React from "react";

const MyHackathons = ({ organizerId }) => {
  return (
    <section>
      <div class="px-4 py-12 mx-auto">
        <div class="max-w-4xl pt-0 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight pt-10 text-center sm:text-5xl dark:text-coolGray-50 ">
            Your Hackathons
          </h2>
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full"></div>
            </div>
          </div>
          <div class="space-y-8 lg:divide-y lg:divide-gray-100">
            <div class="pt-8 sm:flex lg:items-end group">
              <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <img
                  class="w-full rounded-md lg:h-32 lg:w-32"
                  src="https://picsum.photos/200/300?random=1"
                  alt="text"
                />
              </div>
              <div>
                <p class="mt-3 text-lg font-medium leading-6">
                  <a
                    href="./blog-post.html"
                    class="
                      text-xl text-neutral-600
                      group-hover:text-gray-500
                      lg:text-2xl
                    ">
                    Hackathon 1{" "}
                  </a>
                </p>
                <p class="mt-2 text-lg text-gray-500">
                  {" "}
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart.{" "}
                </p>
              </div>
              <div className="flex md:mt-4 mt-6">
                {" "}
                <button class="flex mx-auto mt-6 mx-5 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
                  View More{" "}
                </button>{" "}
                <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
                  Register{" "}
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyHackathons;
