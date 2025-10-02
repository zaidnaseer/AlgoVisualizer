import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogIn, LogOut, Bookmark, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  return (
    <DropdownMenu.Root>
      {/* Trigger Button */}
      <DropdownMenu.Trigger asChild>
        <button
          className="relative p-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-md active:scale-95 group"
          aria-label="User menu"
        >
          <User
            className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            strokeWidth={2}
          />
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown Menu */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={10}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 min-w-[240px] overflow-hidden z-50"
          style={{
            animationDuration: "200ms",
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header with User Info */}
          <div className="px-4 py-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                  Welcome Back!
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your account
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 px-2">
            {/* Login */}
            <DropdownMenu.Item asChild>
              <Link
                to="/login"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-sm">
                  <LogIn className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="flex-1 font-semibold">Login</span>
                <ChevronRight
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                  strokeWidth={2.5}
                />
              </Link>
            </DropdownMenu.Item>

            {/* Saved Notes */}
            <DropdownMenu.Item asChild>
              <Link
                to="/saved"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-800/20 hover:text-amber-700 dark:hover:text-amber-300 focus:outline-none transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-800/40 text-amber-600 dark:text-amber-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-sm">
                  <Bookmark className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="flex-1 font-semibold">Saved Notes</span>
                <ChevronRight
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all"
                  strokeWidth={2.5}
                />
              </Link>
            </DropdownMenu.Item>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-2"></div>

            {/* Logout */}
            <DropdownMenu.Item
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 dark:hover:from-red-900/20 dark:hover:to-rose-800/20 hover:text-red-700 dark:hover:text-red-300 focus:outline-none transition-all duration-200 cursor-pointer group"
              onClick={() => alert("Logout clicked")}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-rose-200 dark:from-red-900/40 dark:to-rose-800/40 text-red-600 dark:text-red-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-sm">
                <LogOut className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span className="flex-1 font-semibold">Logout</span>
              <ChevronRight
                className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all"
                strokeWidth={2.5}
              />
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
