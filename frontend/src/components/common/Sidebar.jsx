import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    Receipt,
    Tags,
    User,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/store/slice/authSlice";

function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { state, toggleSidebar } = useSidebar();

    const handleLogout = async () => {
        await dispatch(logoutThunk());
        navigate("/login");
    };

    const collapsed = state === "collapsed";

    const navItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Transactions",
            path: "/transactions",
            icon: Receipt,
        },
        {
            name: "Categories",
            path: "/categories",
            icon: Tags,
        },
        {
            name: "Reports",
            path: "/reports",
            icon: Receipt,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: User,
        },
    ];

    return (
        <Sidebar
            collapsible="icon"
            className="border-r bg-background"
        >
            {/* Header */}
            <SidebarHeader className="border-b px-3 py-4">
                <div className="flex items-center justify-between">
                    {!collapsed && (
                        <h1 className="text-lg font-bold">
                            Expense Tracker
                        </h1>
                    )}

                    <button
                        onClick={toggleSidebar}
                        className="rounded-md p-2 hover:bg-muted"
                    >
                        {collapsed ? (
                            <div className="pl-3 gap-2">
                                <PanelLeftOpen size={18} />
                            </div>
                        ) : (
                            <PanelLeftClose size={18} />
                        )}
                    </button>
                </div>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="p-2">
                <SidebarGroup className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active =
                            location.pathname === item.path;

                        return (
                            <button
                                key={item.path}
                                onClick={() =>
                                    navigate(item.path)
                                }
                                title={item.name}
                                className={`
                                    w-full flex items-center
                                    ${collapsed ? "justify-center" : "gap-3"}
                                    rounded-lg px-3 py-3
                                    text-sm font-medium
                                    transition-all duration-200

                                    ${active
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }
                                `}
                            >
                                <Icon size={20} />

                                {!collapsed && (
                                    <span>{item.name}</span>
                                )}
                            </button>
                        );
                    })}
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t p-2">
                <button
                    title="Logout"
                    onClick={handleLogout}
                    className={`
                        w-full flex items-center
                        ${collapsed ? "justify-center" : "gap-3"}
                        rounded-lg px-3 py-3
                        text-sm font-medium
                        text-red-500
                        hover:bg-red-500/10
                    `}
                >
                    <LogOut size={20} />

                    {!collapsed && (
                        <span>Logout</span>
                    )}
                </button>
            </SidebarFooter>
        </Sidebar>
    );
}

export default SideBar;