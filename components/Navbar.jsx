import { NavLink } from "react-router-dom";
import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="logo" className="w-18 h-18 object-contain" />
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/onboardingsummary"
          exact // ensure only exact match highlights the link
          className={({ isActive }) => (isActive ? "text-blue-600" : "text-black")}
        >
          Review your progress
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;

