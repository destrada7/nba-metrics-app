import React from "react";
import NBALogo from "../images/nba_logo.png";

const Header = () => {
    return (
        <header className="bg-black p-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-8">
                <img
                    src={NBALogo}
                    alt="NBA Logo"
                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 xl:h-22 xl:w-22 object-contain"
                />

                {/* Navbar */}
                <nav className="space-x-4">
                    <a href="#teams" className="text-white">Teams</a>
                    <a href="#compare" className="text-white">Compare</a>
                </nav>
            </div>

            {/* Search bar */}
            <div>
                <input 
                    type="text"
                    placeholder="Search for a player"
                    className="p-2 rounded border"
                />
            </div>
        </header>
        );
};

export default Header;