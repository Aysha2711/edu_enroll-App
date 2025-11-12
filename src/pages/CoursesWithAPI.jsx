import { useState, useEffect } from "react";
import { Input } from "../components/ui/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { Search, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/api";
import "../styles/Courses.css";

const CoursesWithAPI = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCourses();
        setCourses(response.courses || []);
      } catch (error) {
        setError("Failed to fetch courses");
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const displayedCourses = filteredCourses.slice(0, visibleCount);

  const handleShowMore = () => {
    if (visibleCount >= filteredCourses.length) {
      setVisibleCount(6); // Reset
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!currentUser) {
      alert("Please login to enroll in courses");
      return;
    }

    try {
      await apiService.enrollInCourse(courseId);
      alert("Successfully enrolled in course!");
    } catch (error) {
      alert("Failed to enroll in course: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="courses-container">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-container">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="courses-header">
          <h1 className="courses-title">Explore Our Courses</h1>
        </div>

        {/* Search & Filters */}
        <div className="courses-filters">
          <div className="courses-filters-grid">
            {/* Search */}
            <div className="courses-search-wrapper">
              <Search className="courses-search-icon" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="courses-search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="courses-select-wrapper">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                  <ChevronDown className="courses-dropdown-icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Mobile Development">
                    Mobile Development
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Level Filter */}
            <div className="courses-select-wrapper">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                  <ChevronDown className="courses-dropdown-icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="courses-results-count">
          Showing {displayedCourses.length} of {filteredCourses.length}{" "}
          {filteredCourses.length === 1 ? "course" : "courses"}
        </p>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <>
            <div className="courses-grid">
              {displayedCourses.map((course, index) => (
                <div
                  key={course.id || index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CourseCard 
                    {...course} 
                    onEnroll={() => handleEnroll(course.id)}
                    showEnrollButton={!!currentUser}
                  />
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {filteredCourses.length > 6 && (
              <div className="text-center mt-10">
                <button
                  className="show-more-btn"
                  onClick={handleShowMore}
                >
                  {visibleCount >= filteredCourses.length
                    ? "Show Less"
                    : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="courses-no-results">
            <p className="courses-no-results-title">
              No courses found matching your criteria.
            </p>
            <p className="courses-no-results-subtitle">
              Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesWithAPI;
