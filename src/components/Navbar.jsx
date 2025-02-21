import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./Home";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("new");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleNavItemClick = (query) => {
    setSearchQuery(query);
    setIsOpen(false);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsOpen(false); 
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#a8ff78] via-[#78ffd6] to-[#1e9600] bg-opacity-90 shadow-2xl z-[100]">
        <nav className="w-full md:max-w-[1320px] mx-auto flex justify-between items-center p-4 md:p-6">
          <div className="flex items-center gap-4 font-bold" data-aos="fade-down-left">
            <img className="w-10 h-10 md:w-14 md:h-14 bg-blue-600" src="/logo.webp" alt="Logo" />
            <h1 className="text-xl md:text-2xl text-white">Find Movies</h1>
          </div>
          <div className="hidden md:block">
            <input
              className="border-none bg-white px-5 md:px-10 py-2 rounded-2xl text-black text-[13px] font-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search your movie"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="md:hidden z-[210]" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-3xl cursor-pointer text-black" />
            ) : (
              <FaBars className="text-3xl cursor-pointer text-white" />
            )}
          </div>

          <ul className="hidden md:flex gap-8 text-white text-lg" data-aos="fade-down-right">
            {["Drama", "Web Series", "Anime", "Cartoon"].map((item, index) => (
              <li key={index} className="hover:border-b-2 hover:border-yellow-300">
                <button onClick={() => handleNavItemClick(item)} className="focus:outline-none cursor-pointer">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-black bg-opacity-90 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-[200]`}
      >
        <div className="flex justify-between items-center p-6">
          <h1 className="text-white text-lg font-bold">Find Movies</h1>
        </div>

        <div className="p-4">
          <input
            className="w-full border-none bg-white px-4 py-2 rounded-2xl text-black text-[14px] font-light focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search your movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyPress}
          />
        </div>

        <ul className="flex flex-col gap-6 text-white text-xl p-6">
          {["Drama", "Web Series", "Anime", "Cartoon"].map((item, index) => (
            <li key={index}>
              <button onClick={() => handleNavItemClick(item)} className="w-full text-left hover:border-b-2 hover:border-yellow-300">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-[80px] md:mt-[100px]">
        <Home searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default Navbar;
