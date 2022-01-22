import React from "react";
import Link from "next/link";

const HackathonCard = ({
  name,
  startDate,
  endDate,
  minParticipantCount,
  maxParticipantCount,
  organizerId,
}) => {
  const userId = localStorage.getItem("userId");

  return (
    <div>
      <div class="sm:w-1/2 mb-10 px-4">
        <div class="rounded-lg h-64 overflow-hidden">
          <img
            alt="content"
            class="object-cover object-center h-full w-full"
            src="https://picsum.photos/200/300?random=1"
          />
        </div>
        <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
          {name}
        </h2>
        <p class="leading-relaxed text-base">
          Williamsburg occupy sustainable snackwave gochujang. Pinterest
          cornhole brunch, slow-carb neutra irony.
        </p>
        <div className="flex md:mt-4 mt-6">
          <Link href="#>
            <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
              View More
            </button>
          </Link>
          <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
            {organizerId === userId ? "Edit" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
