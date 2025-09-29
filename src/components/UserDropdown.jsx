import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogIn, LogOut, Bookmark } from "lucide-react";
import { Link } from "react-router-dom"; // 👈 import Link

const UserDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <User className="w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 min-w-[180px]"
          sideOffset={5}
        >
          {/* Login redirects to /login page */}
          <DropdownMenu.Item asChild>
            <Link
              to="/login"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          </DropdownMenu.Item>

          {/* Logout can remain a button (later connect to auth) */}
          <DropdownMenu.Item className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <LogOut className="w-4 h-4" /> Logout
          </DropdownMenu.Item>

          {/* Saved Notes (later connect to dashboard/notes page) */}
          <DropdownMenu.Item className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <Bookmark className="w-4 h-4" /> Saved Notes
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
