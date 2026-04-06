import { IntentDashboardBoundary } from "@/components/IntentDashboardBoundary";
import { Dashboard } from "@/dashboard/Dashboard";

export default function Home() {
  return (
    <IntentDashboardBoundary>
      <Dashboard />
    </IntentDashboardBoundary>
  );
}
