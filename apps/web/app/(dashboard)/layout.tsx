import { ReactNode } from "react";
import DashAside from "./dashboard/components/dash-aside";
import { getSession } from "@/lib/auth-session";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getSession();

    const user = session?.user ?? null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-primary/10 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div 
                    className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" 
                    style={{ background: 'hsla(199, 89%, 48%, 0.4)' }}
                />
                <div 
                    className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" 
                    style={{ background: 'hsla(217, 91%, 60%, 0.4)' }}
                />
            </div>

            {/* Client-side navigation shell (sidebar + user button + mobile nav) */}
            <DashAside user={user} />

            {/* Main Content Area */}
            <main className="lg:pl-32 pt-10 min-h-screen relative z-10">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
