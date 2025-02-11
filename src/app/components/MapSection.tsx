import { useTheme } from "next-themes";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { LatLngBounds, LatLng } from "leaflet";

const citiesBounds = [
  // Contours des villes autour de Bordeaux
  [
    [44.786, -0.585], // Cadaujac
    [44.803, -0.575], // Villenave d'Ornon
    [44.850, -0.560], // Bègles
    [44.830, -0.551], // Léognan
    [44.785, -0.502], // Martillac
    [44.823, -0.512], // St-Médard-d'Eyrans
    [44.790, -0.620], // Talence
    [44.700, -0.663], // La Brède
    [44.696, -0.666], // Saint-Selve
    [44.738, -0.551], // Beautiran
    [44.829, -0.516], // Cestas
    [44.837, -0.607], // Pessac
    [44.858, -0.560], // Bordeaux (centre)
  ]
];

export default function MapSection() {
  const { resolvedTheme } = useTheme();
  
  const [map, setMap] = useState(null);

  const center = [44.858, -0.575]; // Coordonnées de Bordeaux

  useEffect(() => {
    if (map) {
      // Ajouter un contour autour des villes
      const bounds = new LatLngBounds(
        citiesBounds.flat().map(city => new LatLng(city[0], city[1]))
      );
      map.fitBounds(bounds);
    }
  }, [map]);

  return (
    <section
      className={`py-16 ${
        resolvedTheme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <h2
        className={`text-center text-3xl font-bold mb-6 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Découvrez notre zone d’intervention
      </h2>

      <div className="max-w-6xl mx-auto">
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Contours des villes */}
          <Polygon
            positions={citiesBounds}
            color={resolvedTheme === "light" ? "orange" : "yellow"}
            fillOpacity={0.1}
            weight={2}
          />
        </MapContainer>
      </div>
    </section>
  );
}
