import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileNav from "@/components/MobileNav";
import DashboardOverview from "@/components/DashboardOverview";
import DataMonitoring from "@/components/DataMonitoring";
import MapSection from "@/components/MapSection";
import ChartSection from "@/components/ChartSection";
import RekapSection from "@/components/RekapSection";
import AnomalySection from "@/components/AnomalySection";

const TITLES: Record<string, string> = {
  dashboard: "Dashboard Overview",
  data: "Data Monitoring",
  peta: "Peta Sebaran",
  grafik: "Grafik & Statistik",
  rekap: "Rekap Data",
  anomali: "Anomali Data",
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-h-screen">
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
        <header className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-border/50">
          <h2 className="text-xl font-bold text-foreground">{TITLES[activeTab]}</h2>
          <span className="text-xs text-muted-foreground">Monitoring Pemasukan Dokumen Perusahaan Peternakan</span>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "data" && <DataMonitoring />}
          {activeTab === "peta" && <MapSection />}
          {activeTab === "grafik" && <ChartSection />}
          {activeTab === "rekap" && <RekapSection />}
          {activeTab === "anomali" && <AnomalySection />}
        </main>
      </div>
    </div>
  );
}
