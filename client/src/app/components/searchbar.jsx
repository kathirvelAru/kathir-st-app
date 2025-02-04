"use client";
import React, { useState } from "react";
import axios from "axios";
import { useVideosStore } from "../zustand/useVideosStore";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { updateSearchedVideos } = useVideosStore();

  const searchVideos = async () => {
    try {
      const res = await axios.get(
        'https://ieyposq9m8.execute-api.eu-north-1.amazonaws.com/search',
        {
          params: { q: searchText },
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
      console.log("Data received - ", res.data);
      updateSearchedVideos(res.data);
      res.data.forEach((data) => {
        console.log(data);
        console.log("video url", data._source.videoUrl);
      });
    } catch (error) {
      console.log("Error in searching : ", error.message);
    }
  };

  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={searchVideos}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
