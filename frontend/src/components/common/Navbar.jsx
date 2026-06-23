import { NavLink, useNavigate } from "react-router-dom";
import { logoutThunk } from "@/store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { Moon, Sun, LogOut, LayoutDashboard } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logoutThunk()).unwrap();
        navigate("/login", { replace: true });
    };

    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between px-6">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-5 w-5" />
                    <NavLink
                        to="/"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Dashboard
                    </NavLink>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">

                    {/* THEME TOGGLE */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>

                    {/* USER MENU */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="" />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-60">

                            {/* USER INFO */}
                            <DropdownMenuLabel>
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium">{user?.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {user?.email}
                                    </span>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            {/* LOGOUT */}
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header>
    );
}

export default Navbar;