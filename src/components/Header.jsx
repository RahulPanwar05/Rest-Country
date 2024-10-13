import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <div className="flex justify-between items-center  sm:px-20 py-5 px-3 border-b-gray-200 shadow-lg sticky top-0  bg-white z-10  dark:bg-gray-600  dark:text-white ">
      <Link to="/">Where in the world?</Link>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Header;
