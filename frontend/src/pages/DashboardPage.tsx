import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Overview from "../components/dashboard/Overview";
import MessageInbox from "../components/dashboard/MessageInbox";
import LeadBoard from "../components/dashboard/LeadBoard";
import AIBrainPanel from "../components/dashboard/AIBrainPanel";
import KnowledgeBase from "../components/dashboard/KnowledgeBase";
import PlatformManager from "../components/dashboard/PlatformManager";
import Analytics from "../components/dashboard/Analytics";
import Settings from "../components/dashboard/Settings";

const pages: Record<string, () => JSX.Element> = {
  overview: Overview,
  messages: MessageInbox,
  leads: LeadBoard,
  brain: AIBrainPanel,
  knowledge: KnowledgeBase,
  platforms: PlatformManager,
  analytics: Analytics,
  settings: Settings,
};

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("overview");
  const Page = pages[activePage] || Overview;

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 bg-gray-950 p-6 overflow-auto">
        <Page />
      </main>
    </div>
  );
}
