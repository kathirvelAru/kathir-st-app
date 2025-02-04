"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useVideosStore } from "../zustand/useVideosStore";
import NavBar from "../components/navbar";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const YouTubeHome = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchedVideos } = useVideosStore();

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8082/watch/home");
        setVideos(res.data);
        setLoading(false); // Set loading to false when videos are fetched
      } catch (error) {
        console.error("Error in fetching videos: ", error);
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />

      {loading ? (
        <div className="container mx-auto flex justify-center items-center h-screen text-2xl">
          Loading...
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
            {searchedVideos.map((video) => (
              <div key={video._source._id} className="border rounded-md overflow-hidden shadow-lg hover:shadow-xl">
                <div>
                  <ReactPlayer
                    url={video._source.videoUrl}
                    width="360px"
                    height="180px"
                    controls={true}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{video._source.title}</h2>
                  <p className="text-gray-700">Author - {video._source.author}</p>
                  <p className="text-gray-700">{video._source.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
            {videos.map((video) => (
              <div key={video.id} className="border rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <div>
                  <ReactPlayer
                    url={video.url}
                    width="100%" // Use full width for responsive design
                    height="180px"
                    controls={true}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">{video.title}</h2>
                  <p className="text-gray-700">Author - <span className="font-medium">{video.author}</span></p>
                  <p className="text-gray-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeHome;
