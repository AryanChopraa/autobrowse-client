"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';

interface NavItem {
  label: string;
  href: string;
}

const guestNavItems: NavItem[] = [
  { label: "Login", href: "/auth/login" },
  { label: "Register", href: "/auth/register" },
];

const authNavItems: NavItem[] = [

  { label: "Tasks", href: "/tasks" },
  { label: "Profile", href: "/dashboard" },
];

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };

  const isSelected = (path: string) => pathname === path;

  const navItems = isAuthenticated ? authNavItems : guestNavItems;

  return (
    <div className={`fixed top-0 w-full z-30 transition-all duration-300 ease-in-out ${
      sticky ? "bg-opacity-90 backdrop-blur-lg shadow-lg" : "bg-transparent"
    }`}>
      <div className="flex flex-col max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <Link href="/"
            className="text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline"
          >
            <h1 className="text-3xl md:text-4xl lg:text-3xl Avenir tracking-tighter text-white">
              autosurf.<span className="text-blue-500">ai</span>
            </h1>
          </Link>
          <button
            className="text-white cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <div
          className={`md:flex flex-grow items-center ${
            navbarOpen ? "flex" : "hidden"
          }`}
        >
          <nav className="flex-col flex-grow md:flex md:justify-end md:flex-row">
            <ul className="flex flex-col list-none md:flex-row md:ml-auto">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link href={item.href}
                    className={`font-medium text-white hover:text-blue-300 px-5 py-3 flex items-center transition duration-150 ease-in-out relative group ${
                      isSelected(item.href) ? 'text-blue-300' : ''
                    }`}
                    onClick={() => setNavbarOpen(false)}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <li className="nav-item">
                  <button
                    onClick={() => {
                      handleLogout();
                      setNavbarOpen(false);
                    }}
                    className="font-medium text-white hover:text-blue-300 px-5 py-3 flex items-center transition duration-150 ease-in-out relative group"
                  >
                    Logout
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

