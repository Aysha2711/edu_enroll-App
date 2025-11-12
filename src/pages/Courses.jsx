// import { useState } from "react";
// import { Input } from "../components/ui/Input.jsx";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select.jsx";
// import CourseCard from "../components/CourseCard.jsx";
// import { Search } from "lucide-react";
// import courseWeb from "../assets/course-web.jpg";
// import courseData from "../assets/course-data.jpg";
// import courseMobile from "../assets/course-mobile.jpg";
// import "../styles/Courses.css";

// const Courses = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [levelFilter, setLevelFilter] = useState("all");

//   const allCourses = [
//     {
//       id: "1",
//       title: "Complete Web Development Bootcamp",
//       description: "Master HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and deploy them.",
//       instructor: "Sarah Johnson",
//       duration: "40 hours",
//       rating: 4.8,
//       image: courseWeb,
//       category: "Web Development",
//       level: "Beginner",
//     },
//     {
//       id: "4",
//       title: "Advanced React & TypeScript",
//       description: "Deep dive into React patterns, hooks, context, and TypeScript integration for scalable applications.",
//       instructor: "David Park",
//       duration: "25 hours",
//       rating: 4.9,
//       image: courseWeb,
//       category: "Web Development",
//       level: "Advanced",
//     },
//     {
//       id: "2",
//       title: "Data Science & Machine Learning",
//       description: "Learn Python, pandas, numpy, scikit-learn and build powerful ML models for data analysis.",
//       instructor: "Dr. Michael Chen",
//       duration: "35 hours",
//       rating: 4.9,
//       image: courseData,
//       category: "Data Science",
//       level: "Intermediate",
//     },
//     {
//       id: "5",
//       title: "Python for Beginners",
//       description: "Start your programming journey with Python. Learn fundamentals, data structures, and OOP concepts.",
//       instructor: "Lisa Anderson",
//       duration: "20 hours",
//       rating: 4.7,
//       image: courseData,
//       category: "Data Science",
//       level: "Beginner",
//     },
//     {
//       id: "3",
//       title: "Mobile App Development with React Native",
//       description: "Build iOS and Android apps with React Native. Deploy to app stores and manage user data.",
//       instructor: "Emma Williams",
//       duration: "30 hours",
//       rating: 4.7,
//       image: courseMobile,
//       category: "Mobile Development",
//       level: "Intermediate",
//     },
//     {
//       id: "6",
//       title: "iOS Development with Swift",
//       description: "Create native iOS applications using Swift and SwiftUI. Learn app architecture and design patterns.",
//       instructor: "Robert Kim",
//       duration: "32 hours",
//       rating: 4.8,
//       image: courseMobile,
//       category: "Mobile Development",
//       level: "Intermediate",
//     },
//   ];

//   const filteredCourses = allCourses.filter((course) => {
//     const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
//     const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
//     return matchesSearch && matchesCategory && matchesLevel;
//   });

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12 animate-slide-up">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
//           <p className="text-muted-foreground text-lg">
//             Find the perfect course to advance your career
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-card rounded-lg shadow-card p-6 mb-12 animate-fade-in">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Search */}
//             <div className="relative md:col-span-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search courses..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             {/* Category Filter */}
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="Web Development">Web Development</SelectItem>
//                 <SelectItem value="Data Science">Data Science</SelectItem>
//                 <SelectItem value="Mobile Development">Mobile Development</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Level Filter */}
//             <Select value={levelFilter} onValueChange={setLevelFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Levels</SelectItem>
//                 <SelectItem value="Beginner">Beginner</SelectItem>
//                 <SelectItem value="Intermediate">Intermediate</SelectItem>
//                 <SelectItem value="Advanced">Advanced</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-muted-foreground">
//             Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
//           </p>
//         </div>

//         {/* Course Grid */}
//         {filteredCourses.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredCourses.map((course, index) => (
//               <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
//                 <CourseCard {...course} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
//             <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Courses;


import { useState, useEffect } from "react";
import { Input } from "../components/ui/Input.jsx";
import {
  Select,
  SelectItem,
} from "../components/ui/Select.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { Search } from "lucide-react";
import "../styles/Courses.css";
import firestoreService from "../services/firestoreService";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const courses = await firestoreService.getAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    const isActive = course.status === 'active' || !course.status; // Show courses without status field as active

    return matchesSearch && matchesCategory && matchesLevel && isActive;
  });

  const displayedCourses = filteredCourses.slice(0, visibleCount);

  const handleShowMore = () => {
    if (visibleCount >= filteredCourses.length) {
      setVisibleCount(6); // Reset
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };

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
              <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Mobile Development">Mobile Development</SelectItem>
              </Select>
            </div>

            {/* Level Filter */}
            <div className="courses-select-wrapper">
              <Select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
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
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CourseCard {...course} />
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

export default Courses;
