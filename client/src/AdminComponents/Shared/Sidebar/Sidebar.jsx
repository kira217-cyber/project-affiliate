import React, { useContext, useState, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { FaChevronDown, FaMicrophone } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "../../../Context/AuthContext";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const location = useLocation(); // To get the current route
  const {logout} = useContext(AuthContext)

  const handleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
    setActiveSubDropdown(null);
  };

  const handleSubDropdown = (submenu) => {
    setActiveSubDropdown(activeSubDropdown === submenu ? null : submenu);
  };



  

 const downlineDropdown = [
      { name: "Super Affiliate", path: `/affiliate/super` },
      { name: "Master Affiliate", path: `/affiliate/master` },
    ];

  // Full navItems with conditional Downline
  const navItems = [
    {
      name: "Downline",
      dropdown: downlineDropdown,
    },
    {
      name: "My Account",
      dropdown: [
        {
          name: "Account Statement",
          path: `/account-statement`,
        },
        {
          name: "Account Summary",
          path: `/account-summary`,
        },
        {
          name: "Profile",
          path: `/profile`,
        },
        {
          name: "Active Log",
          path: `/active-log`,
        },
      ],
    },
    {
      name: "My Report",
      dropdown: [
        {
          name: "Profit/Loss Report by Downline",
          path: `/my-report-pnl-downline`,
        },
        {
          name: "Profit/Loss Report by Parlay Downline",
          path: `/my-report-parlay-downline`,
        },
        {
          name: "Summary Profit/Loss Report",
          path: `/my-report-summary-pnl`,
        },
        {
          name: "Profit/Loss Report by Market",
          path: `/my-report-pl-market`,
        },
        {
          name: "Profit/Loss Report by Player",
          path: `/my-report-pl-player`,
        },
        {
          name: "Profit/Loss Report by All Casino",
          path: `/my-report-pl-casino`,
        },
        {
          name: "Profit/Loss Report by Casino Downline",
          path: `/my-report-pnl-casino-downline`,
        },
        {
          name: "Spin History",
          path: `/my-report-spin`,
        },
        {
          name: "Pending Spin Users",
          path: `/my-report-spinList`,
        },
      ],
    },
    {
      name: "Management",
      dropdown: [
        {
          name: "Risk Management",
          path: `/risk-management`,
        },
        { name: "MM", path: `/mm` },
        {
          name: "Settings",
          path: `/settings`,
        },
        {
          name: "P-Settings",
          path: `/p-settings`,
        },
        { name: "Ticker", path: `/ticker` },
        {
          name: "Pop Ticker",
          path: `/pop-ticker`,
        },
        { name: "Social", path: `/social` },
        {
          name: "Upload Banner",
          path: `/upload-banner`,
        },
      ],
    },
    { name: "Pending Request", path: `/affiliate/master-pending-request` },
    { name: "Profile", path: `/affiliate/profile` },
    { name: "Banking", path: `/banking` },
 
  ];

  // Find the active nav item name based on the current path
  const activeNavItemName = useMemo(() => {
    const currentPath = location.pathname;

    // Flatten navItems to include all paths (including dropdowns)
    const allNavItems = navItems.flatMap((item) =>
      item.dropdown
        ? item.dropdown.map((drop) => ({ name: drop.name, path: drop.path }))
        : [{ name: item.name, path: item.path }]
    );

    // Find the nav item whose path matches or is a prefix of the current path
    const activeItem = allNavItems.find((item) =>
      currentPath.startsWith(item.path)
    );

    return activeItem ? activeItem.name : "Downline List"; // Fallback to "Downline List"
  }, [location.pathname, navItems]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-black w-72 text-white fixed h-full transition-all duration-300 overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-gray-700">
          <h1 className="text-xl font-bold text-primary">Affiliate</h1>
        </div>

        <nav className="mt-1">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <div key={index} className="border-b border-gray-700 text-[12px]">
                <button
                  onClick={() => handleDropdown(item.name)}
                  className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-700"
                >
                  <span>{item.name}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === item.name && (
                  <div className="bg-gray-800 text-[12px]">
                    {item.dropdown.map((drop, i) =>
                      drop.dropdown ? (
                        <div key={i}>
                          <button
                            onClick={() => handleSubDropdown(drop.name)}
                            className="w-full flex justify-between items-center px-6 py-2 hover:bg-gray-700"
                          >
                            <span>{drop.name}</span>
                            <FaChevronDown
                              className={`transform transition-transform ${
                                activeSubDropdown === drop.name
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          {activeSubDropdown === drop.name && (
                            <div className="bg-gray-900">
                              {drop.dropdown.map((sub, j) => (
                                <NavLink
                                  key={j}
                                  to={sub.path}
                                  className={({ isActive }) =>
                                    `block px-8 py-2 ${
                                      isActive
                                        ? "bg-red-500"
                                        : "hover:bg-gray-700"
                                    }`
                                  }
                                >
                                  {sub.name}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <NavLink
                          key={i}
                          to={drop.path}
                          className={({ isActive }) =>
                            `block px-6 py-2 ${
                              isActive ? "bg-primary/80" : "hover:bg-gray-700"
                            }`
                          }
                        >
                          {drop.name}
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 border-b border-gray-700 text-[12px] ${
                    isActive ? "bg-primary/80" : "hover:bg-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </nav>

        <button
          onClick={() => logout()}
          className="w-full text-left px-4 py-4 text-[12px] cursor-pointer hover:bg-primary/80 flex items-center gap-4"
        >
          Logout <TbLogout size={18} />
        </button>
      </aside>

      {/* Main Section */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "ml-72" : "ml-0"
        }`}
      >
        {/* Top Navbar */}
        <header className="bg-primary/80 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-2xl">{activeNavItemName}</h1>
          </div>
          <div className="px-4 py-1 rounded text-sm flex items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-yellow-400 py-1 px-2 bg-gray-700 text-[12px] font-bold">
                WL
              </span>
              <span className="">Name [P]</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold py-1 px-2 bg-gray-700 text-[12px]">
                Main
              </span>
              <span className="">balance</span>
            </div>

            <button
              className="flex items-center justify-center gap-2 hover:cursor-pointer"
            >
              <span className="font-bold py-2 px-4 bg-gray-700 text-[12px]">
                <TfiReload size={20} />
              </span>
            </button>
          </div>
        </header>

        {/* News Bar */}
        <div className="bg-[#1f2937] p-2 flex items-center gap-2">
          <FaMicrophone className="text-white" />
          <p className="text-white text-sm">News</p>
        </div>

        {/* Outlet (Dynamic Page Content) */}
        <div className="mt-4 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
