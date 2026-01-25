"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

// Fix for default Leaflet icons in Next.js
const fixLeafletIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

interface EgyptMapProps {
  data: {
    name: string;
    customers: string;
    percentage: number;
    color: string;
    coords: [number, number];
  }[];
}

const egyptCenter: [number, number] = [26.8206, 30.8025];

export default function EgyptMap({ data }: EgyptMapProps) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-divider shadow-inner relative group bg-gray-50">
      <MapContainer
        center={egyptCenter}
        zoom={6}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {data.map((item, idx) => (
          <Marker key={idx} position={item.coords}>
            <Popup className="custom-popup">
              <div className="p-1 min-w-[120px]">
                <p className="font-bold text-primary text-sm">{item.name}</p>
                <p className="text-xs text-content-secondary">{item.customers}</p>
                <div className="mt-2 w-full h-1.5 bg-divider rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full", item.color)} 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-right mt-1 font-bold text-content-tertiary">{item.percentage}% Growth</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapControls />
      </MapContainer>

      <style jsx global>{`
        .leaflet-container {
          background: #f8f9fa;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #ECEBEE;
        }
        .custom-popup .leaflet-popup-content {
          margin: 12px;
        }
        .custom-popup .leaflet-popup-tip {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

function MapControls() {
  const map = useMap();
  
  return (
    <div className="absolute bottom-4 left-4 z-1000 flex flex-col gap-2">
      <Button 
        variant="secondary" 
        size="icon" 
        onClick={() => map.zoomIn()}
        className="h-9 w-9 bg-white hover:bg-gray-50 text-content-primary shadow-sm border-divider border rounded-lg"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button 
        variant="secondary" 
        size="icon" 
        onClick={() => map.zoomOut()}
        className="h-9 w-9 bg-white hover:bg-gray-50 text-content-primary shadow-sm border-divider border rounded-lg"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
    </div>
  );
}



