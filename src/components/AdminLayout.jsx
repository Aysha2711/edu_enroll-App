// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { Button } from "./ui/Button.jsx";
// import { 
//   LayoutDashboard, 
//   BookOpen, 
//   Users, 
//   Award, 
//   BarChart3, 
//   Settings, 
//   LogOut,
//   Menu
// } from "lucide-react";
// import { useState } from "react";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Mock logout - in real app would clear auth tokens
//     navigate("/");
//   };

//   const navItems = [
//     { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
//     { title: "Courses", url: "/admin/courses", icon: BookOpen },
//     { title: "Students", url: "/admin/students", icon: Users },
//     { title: "Certificates", url: "/admin/certificates", icon: Award },
//     { title: "Reports", url: "/admin/reports", icon: BarChart3 },
//     { title: "Settings", url: "/admin/settings", icon: Settings },
//   ];

//   return (
//     <div className="min-h-screen flex w-full bg-background">
//       {/* Sidebar */}
//       <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-card border-r transition-all duration-300 flex flex-col`}>
//         <div className="p-4 border-b flex items-center justify-between">
//           {sidebarOpen && <h2 className="text-xl font-bold text-primary">OnCode Admin</h2>}
//           <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
//             <Menu className="h-5 w-5" />
//           </Button>
//         </div>

//         <nav className="flex-1 p-4">
//           <ul className="space-y-2">
//             {navItems.map((item) => (
//               <li key={item.title}>
//                 <NavLink
//                   to={item.url}
//                   end={item.end}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
//                       isActive
//                         ? "bg-primary text-primary-foreground"
//                         : "hover:bg-accent"
//                     }`
//                   }
//                 >
//                   <item.icon className="h-5 w-5 flex-shrink-0" />
//                   {sidebarOpen && <span>{item.title}</span>}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="p-4 border-t">
//           <Button
//             variant="ghost"
//             className="w-full justify-start gap-3"
//             onClick={handleLogout}
//           >
//             <LogOut className="h-5 w-5 flex-shrink-0" />
//             {sidebarOpen && <span>Logout</span>}
//           </Button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.jsx";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Award,
  //BarChart3,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { useState } from "react";
import "../styles/adminlayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear all authentication data
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      
      // Navigate to home page
      navigate("/");
      
      // Reload page to ensure clean state
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
    { title: "Courses", url: "/admin/courses", icon: BookOpen },
    { title: "Students", url: "/admin/students", icon: Users },
    { title: "Certificates", url: "/admin/certificates", icon: Award },
   // { title: "Reports", url: "/admin/reports", icon: BarChart3 },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h2 className="sidebar-title">OnCode Admin</h2>}
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <item.icon className="nav-icon" />
                  {sidebarOpen && <span className="nav-text">{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Button variant="ghost" className="logout-btn" onClick={handleLogout}>
            <LogOut className="nav-icon" />
            {sidebarOpen && <span className="nav-text">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
