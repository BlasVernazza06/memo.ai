import DashHero from "./components/dash-hero";
import DashWorkspacesSec from "./components/dash-workspaces-sec";

export default function DashboardPage() {
    {/* GetWorkspaceLogic */}

    return (
        <div className="space-y-12 py-6">
            {/* Dashboard Hero */}
            <DashHero />

            {/* Workspaces Section */}
            <DashWorkspacesSec />
        </div>
    );
}
