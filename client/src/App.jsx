import React, { useState, useEffect } from "react";
import CourseList from "./components/CourseList";
import SearchBar from "./components/SearchBar";
import "./App.css"; 

const App = () => {
  const [topCourses, setTopCourses] = useState([]); 
  const [searchResults, setSearchResults] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [error, setError] = useState(""); 

 
  useEffect(() => {
    fetch("http://127.0.0.1:5000/courses")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTopCourses(data.data);
        } else {
          setError(data.message || "Failed to fetch top courses.");
        }
      })
      .catch(() => setError("Error fetching top courses."));
  }, []);

  
  const handleSearch = () => {
    fetch("http://127.0.0.1:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term: searchQuery }),
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
    <div className="app-container">
      <h1>Course Finder</h1>

      {/* Search Component */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Display Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Top Courses or Search Results */}
      {searchResults.length > 0 ? (
        <CourseList courses={searchResults} title="Search Results" />
      ) : (
        <CourseList courses={topCourses} title="Top Rated Courses" />
      )}
    </div>
  );
};

export default App;
