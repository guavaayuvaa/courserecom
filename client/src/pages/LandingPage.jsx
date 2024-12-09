import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Course from "../components/Course";
import { useCurrentUser } from "../utils/getCurrentUser"; // Import the hook
import './landing-page.css';

const LandingPage = () => {
  const [topCourses, setTopCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedCourses, setSavedCourses] = useState([]); // Add this state variable
  const [activeTab, setActiveTab] = useState('courses'); // Add state for active tab
  const navigate = useNavigate();
  const { currentUser, loading, error: currentUserError } = useCurrentUser(); // Use the hook

  const API = "http://127.0.0.1:5000";
  const nodeAPI = "http://localhost:3000"

  const saveCourse = async (course) => { // Modified saveCourses function
    try {
      const token = localStorage.getItem("token")
      console.log(token)
      const response = await fetch(`${nodeAPI}/courses/save`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : token
        },
        body: JSON.stringify({ course }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Course saved successfully');
        fetchSavedCourses(); // Refresh the saved courses list
      } else {
        console.error('Failed to save course:', data.message);
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const fetchSavedCourses = async () => { // Add this function
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${nodeAPI}/courses/saved`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
           'authorization' : token
        },
      });
      const data = await response.json();
      if (data.success) {
        setSavedCourses(data.courses);
      } else {
        console.error('Failed to fetch saved courses:', data.message);
      }
    } catch (error) {
      console.error('Error fetching saved courses:', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  useEffect(() => {
    fetch(`${API}/courses`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTopCourses(data.data);
          console.log(currentUser)
          // Save the top courses - Commented out as we are saving individual courses now.
          //saveCourses(data.data); 
        } else {
          setError(data.message || "Failed to fetch top courses");
        }
      })
      .catch((err) => {
        console.error("Error fetching the top courses:", err);
        setError("Error fetching the top courses");
      });
  }, []);

  useEffect(() => { // Add this effect to fetch saved courses
    fetchSavedCourses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);

    fetch(`${API}/search`, {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term: search }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(JSON.stringify(data));
          setSearchResults(data.data);
          setError(""); // Clear error

          // Save the courses after receiving the search results - Commented out as we are saving individual courses now.
          //saveCourses(data.data);
        } else {
          setSearchResults([]);
          setError(data.message || "No matching courses found.");
        }
      })
      .catch((err) => {
        console.error("Error searching for courses:", err);
        setError("Error searching for courses.");
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center px-6 bg-blue-800 py-6 fixed top-0 left-0 right-0">
        <Navbar isLogin={true} />
        {loading ? (
          <p className="text-white">Loading user...</p>
        ) : currentUserError ? (
          <p className="text-white">Error: {currentUserError}</p>
        ) : currentUser ? (
          <p className="text-white">Welcome, {currentUser}!</p>
        ) : (
          <p className="text-white">Please log in</p>
        )}
      </div>

      <div className="flex flex-grow mt-28">
        <div className="flex flex-col bg-white w-[95%] h-[95%] ml-10 rounded-lg p-6">
          <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <button
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                activeTab === 'courses'
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              }`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </button>
            <button
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                activeTab === 'saved'
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              Saved Courses
            </button>
          </div>
          <div className="mt-2">
            {activeTab === 'courses' && (
              <>
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

                {searchTerm !== "" && (
                  <p className="text-center mt-12 font-semibold text-lg">
                    Recommendations for{" "}
                    <span className="text-green-500">"{searchTerm}"</span> are shown
                    below{" "}
                  </p>
                )}
                <div className="grid grid-cols-3 gap-4 mt-24 bg-gray-200 p-4 rounded-lg">
                  {searchResults.length > 0 ? (
                    <Course courses={searchResults} onSave={saveCourse} />
                  ) : (
                    <Course courses={topCourses} onSave={saveCourse} />
                  )}
                </div>
              </>
            )}
            {activeTab === 'saved' && (
              <div className="grid grid-cols-3 gap-4 mt-24 bg-gray-200 p-4 rounded-lg">
                <Course courses={savedCourses} />
              </div>
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

