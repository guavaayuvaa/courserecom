import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Course from "../components/Course";

const LandingPage = () => {
  const [topCourses, setTopCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const API = "http://127.0.0.1:5000";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  useEffect(() => {
    fetch(`${API}/courses`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTopCourses(data.data);
        } else {
          setError(data.message || "Failed to fetch top courses");
        }
      })
      .catch(() => setError("Error fetching the top courses"));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);

    fetch(`${API}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term: search }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSearchResults(data.data);
          setError(""); // Clear error
        } else {
          setSearchResults([]);
          setError(data.message || "No matching courses found.");
        }
      })
      .catch(() => setError("Error searching for courses."));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center px-6 bg-blue-800 py-6 fixed top-0 left-0 right-0">
        <Navbar isLogin={true} />
      </div>

      <div className="flex flex-grow mt-28">
        <div className="flex flex-col bg-white w-[95%] h-[95%] ml-10 rounded-lg p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg pl-6 pr-4 border border-gray-400"
              placeholder="Search for courses"
            />

            <button
              className="bg-green-400 text-white font-semibold rounded-lg px-4 py-2"
              type="submit"
            >
              Recommend
            </button>
          </form>

          {searchTerm === "" ? (
            <div></div>
          ) : (
            <p className="text-center mt-12 font-semibold text-lg">
              Recommendations for{" "}
              <span className="text-green-500">"{searchTerm}"</span> are shown
              below{" "}
            </p>
          )}
          <div className="grid grid-cols-3 gap-4 mt-24 bg-gray-200 p-4 rounded-lg">
            {searchResults.length > 0 ? (
              <Course courses={searchResults} />
            ) : (
              <Course courses={topCourses} />
            )}
          </div>
        </div>
      </div>

      <footer className="bg-blue-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Course Recommendation System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
