import { BarChart3, Database, Map, PieChart, FileText, AlertTriangle } from "lucide-react";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "data", label: "Data Monitoring", icon: Database },
  { id: "peta", label: "Peta", icon: Map },
  { id: "grafik", label: "Grafik", icon: PieChart },
  { id: "rekap", label: "Rekap", icon: FileText },
  { id: "anomali", label: "Anomali Data", icon: AlertTriangle },
];

export default function DashboardSidebar({ activeTab, onTabChange }: Props) {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen gradient-hero">
      <div className="p-6">
        <h1 className="text-lg font-bold text-primary-foreground tracking-tight">
          Monitoring Peternakan
        </h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Pemasukan Dokumen Perusahaan</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 m-3 rounded-lg bg-sidebar-accent/50">
        <p className="text-xs text-sidebar-foreground/60">© 2026 BPS Jawa Tengah</p>
      </div>
    </aside>
  );
}
