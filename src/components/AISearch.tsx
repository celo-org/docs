import siteConfig from "@generated/docusaurus.config";
import axios from "axios";
import React from "react";

type Props = {};

function AISearch({}: Props) {
  const [search, setSearch] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const searchHandler = async () => {
    if (search.length > 0) {
      try {
        setLoading(true);
        const res = await axios({
          method: "post",
          url: `https://celo-api-gateway-2-0-bh6101jl.uc.gateway.dev/inference?key=${siteConfig.customFields.Docusaurus_SPANNING_API}`,
          data: {
            question: search,
            chatHistory: [],
          },
        });
        const { answer } = res.data;
        console.log(
          "🚀 ~ file: AISearch.tsx:24 ~ searchHandler ~ answer:",
          answer
        );
        setAnswer(answer);
      } catch (e) {
        setSearch("");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="mt-20 mb-16 w-full">
      <form>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="mx-2 mb-2">
          <span className="font-bold text-black dark:text-white">
            ✨ Ask out AI to narrow your search
          </span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-2 flex items-center pl-3">
            <svg
              className="w-4 h-4 text-gray-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:border-transparent focus:box-shadow-glow block w-full px-12 py-4 text-base text-gray-900 border-2 border-white rounded-2xl bg-sand dark:bg-black  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-bold"
            placeholder='Eg: "How to get started with Celo?"'
            required
            style={{
              border: "1px solid #e2e8f0",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchHandler();
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 absolute right-4 bottom-4"
            onClick={searchHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </form>
      {loading && (
        <div className="w-full flex items-center justify-center font-bold">
          <span className="py-2 px-3 mt-3 bg-black rounded-xl flex items-center justify-center">
            Generating the response...{" "}
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-5 h-5 mx-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1E002B"
              />
            </svg>
          </span>
        </div>
      )}
      {answer.length > 0 && (
        <div className="whitespace-pre-wrap mt-4 bg-black w-full rounded-xl font-bold text-white transition-all duration-1000 ease-in-out p-4 text-left flex flex-col">
          {answer}
          <div className="mt-2">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(answer);
              }}
              className="text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800 border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
              <span className=""> Copy</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswer("");
                setSearch("");
              }}
              className="text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800 border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <span className=""> Clear</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default AISearch;
