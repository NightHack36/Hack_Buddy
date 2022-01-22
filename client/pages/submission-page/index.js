import React, { useState } from "react";

const SubmissionPage = () => {
  const [githubLink, setGithubLink] = useState("");
  const [liveProjectLink, setLiveProjectLink] = useState("");
  const [aboutProject, setAboutProject] = useState("");

  handleSubmit = async (e) => {
    e.preventDefault();
    const body = { githubLink, liveProjectLink, aboutProject };
    const res = await axios.post("/api/hackathons/submission", body);
    console.log(res.data);
  };

  return (
    <section>
      <div class="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-3xl font-extrabold text-center text-neutral-600">
            {" "}
            Submit Your Hack{" "}
          </h2>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="px-4 py-8 sm:px-10">
            <form
              class="space-y-6"
              action="#"
              method="POST"
              action="#"
              onSubmit={handleSubmit}>
              <div>
                <label
                  for="githubRepo"
                  class="block text-sm font-medium text-gray-700">
                  Github Repo Link{" "}
                </label>
                <div class="mt-1">
                  <input
                    id="githubRepo"
                    name="emgithubRepoail"
                    type="link"
                    autocomplete="Github Repo"
                    required=""
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
                <label
                  for="liveProjectLink"
                  class="block text-sm font-medium text-gray-700">
                  {" "}
                  Live Project Link{" "}
                </label>
                <div class="mt-1">
                  <input
                    id="liveProjectLink"
                    name="liveProjectLink"
                    type="liveProjectLink"
                    autocomplete="liveProjectLink"
                    required=""
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
                <label
                  for="projectInfo"
                  class="block text-sm font-medium text-gray-700">
                  {" "}
                  Tell us about your project{" "}
                </label>
                <div class="mt-1">
                  <textarea
                    id="projectInfo"
                    name="projectInfo"
                    type="projectInfo"
                    autocomplete="projectInfo"
                    required=""
                    class="
                      block
                      w-full h-[250px]
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
                  Submit{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionPage;
