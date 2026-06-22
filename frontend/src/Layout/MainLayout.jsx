import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <SidebarProvider>
                <div className="flex min-h-svh w-full bg-background">
                    {/* You can add a header or sidebar here if needed */}

                    <SideBar />

                    <div className="flex min-w-0 flex-1 flex-col">
                        {/* Navbar — always visible (shows behind popup) */}
                        <Navbar />

                        <main className="flex-1 overflow-x-hidden bg-background">
                            <Outlet />
                        </main>
                    </div>

                </div>
            </SidebarProvider>
        </>
    );
}

export default MainLayout;