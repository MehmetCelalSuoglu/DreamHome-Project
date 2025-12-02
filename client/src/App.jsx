import "./App.css";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Staff from "./Staff";
import Branches from "./Branches";
import Clients from "./Clients";

function App() {
  return (
    <div className="app-root">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/src/assets/DHRES.png" alt="Logo" className="logo-img" />
          <span className="nav-title">Dream Home Real Estate System</span>
        </div>
        <div className="nav-right">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-link-btn" + (isActive ? " active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/staff"
            className={({ isActive }) =>
              "nav-link-btn" + (isActive ? " active" : "")
            }
          >
            Staff
          </NavLink>
          <NavLink
            to="/branches"
            className={({ isActive }) =>
              "nav-link-btn" + (isActive ? " active" : "")
            }
          >
            Branches
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              "nav-link-btn" + (isActive ? " active" : "")
            }
          >
            Clients
          </NavLink>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="page">
        <div className="page-inner">
          <Routes>
            {/* Home is the default page */}
            <Route path="/" element={<Home />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </div>
      </main>


      <footer className="footer">
        <p>
          Copyright © Mehmet Celal Suoglu, Ramika Dinan, Salman Vahora, 
          COMP214 - Project, 2025
        </p>
      </footer>
    </div>
  );
}

export default App;





