import { BarChart3, Database, Map, PieChart, FileText, AlertTriangle, Menu, X } from "lucide-react";
import { useState } from "react";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "data", label: "Data", icon: Database },
  { id: "peta", label: "Peta", icon: Map },
  { id: "grafik", label: "Grafik", icon: PieChart },
  { id: "rekap", label: "Rekap", icon: FileText },
  { id: "anomali", label: "Anomali", icon: AlertTriangle },
];

export default function MobileNav({ activeTab, onTabChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 py-3 gradient-hero">
        <h1 className="text-sm font-bold text-primary-foreground">Monitoring Peternakan</h1>
        <button onClick={() => setOpen(!open)} className="text-primary-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="gradient-hero px-3 pb-3 space-y-1 animate-fade-in">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
