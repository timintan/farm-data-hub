import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPetaData, KATEGORI_INFO, type Kategori, type PerusahaanRow } from "@/lib/api";
import { MapPin } from "lucide-react";

const KATEGORI_LIST: Kategori[] = ["LTS", "LTT", "LTU"];

export default function MapSection() {
  const [mounted, setMounted] = useState(false);

  const queries = KATEGORI_LIST.map(k =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({ queryKey: ["peta", k], queryFn: () => fetchPetaData(k), staleTime: 10 * 60 * 1000 })
  );

  const isLoading = queries.some(q => q.isLoading);
  const allData = queries.flatMap(q => q.data || []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="glass-card rounded-xl p-4 flex items-center gap-4">
        <MapPin size={18} className="text-primary" />
        <span className="text-sm font-medium">Peta Sebaran Perusahaan Peternakan</span>
        <div className="ml-auto flex gap-3">
          {KATEGORI_LIST.map(k => (
            <span key={k} className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-3 rounded-full" style={{ background: KATEGORI_INFO[k].color }} />
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden stat-shadow" style={{ height: 500 }}>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <LeafletMap data={allData} />
        )}
      </div>
    </div>
  );
}

function LeafletMap({ data }: { data: PerusahaanRow[] }) {
  const [mapReady, setMapReady] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    import("react-leaflet").then(mod => {
      setMapComponents(mod);
      setMapReady(true);
    });
    import("leaflet/dist/leaflet.css");
  }, []);

  if (!mapReady || !MapComponents) return null;

  const { MapContainer, TileLayer, CircleMarker, Popup } = MapComponents;

  const colorMap: Record<string, string> = {
    LTS: "hsl(152 60% 38%)",
    LTT: "hsl(36 95% 55%)",
    LTU: "hsl(0 72% 51%)",
  };

  return (
    <MapContainer center={[-7.2, 110.0]} zoom={8} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((row, i) => {
        const koordinat = row.Koordinat;
        if (!koordinat) return null;
        const parts = koordinat.split(",");
        if (parts.length !== 2) return null;
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);
        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <CircleMarker
            key={i}
            center={[lat, lng]}
            radius={6}
            pathOptions={{ color: colorMap[row.kategori || "LTS"], fillOpacity: 0.8 }}
          >
            <Popup>
              <b>{row["Nama Perusahaan/Farm"] || "-"}</b><br />
              {row["Nama Kab/Kota"]}<br />
              {row.kategori}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
