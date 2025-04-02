// import { MapContainer, TileLayer, Polygon } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect, useState } from "react";
// import { LatLngBounds, LatLng } from "leaflet";
// import { useTheme } from "next-themes";

// interface CityBoundary {
//   type: string;
//   features: Array<{
//     type: string;
//     geometry: {
//       type: string;
//       coordinates: number[][][];
//     };
//   }>;
// }

// export default function MapSection() {
//   const { resolvedTheme } = useTheme();
  
//   const [map, setMap] = useState<L.Map | null>(null);
//   const [cityBoundaries, setCityBoundaries] = useState<{
//     bordeaux: LatLng[][] | null;
//     begles: LatLng[][] | null;
//   }>({
//     bordeaux: null,
//     begles: null
//   });

//   const center: [number, number] = [44.858, -0.575]; // Coordonnées de Bordeaux

//   // Fonction pour convertir les coordonnées GeoJSON en LatLng
//   const convertToLatLng = (coordinates: number[][][]): LatLng[][] => {
//     return coordinates.map(polygon => 
//       polygon[0].map(coord => 
//         new LatLng(coord[1], coord[0])
//       )
//     );
//   };

//   // Fonction pour récupérer les frontières d'une ville
//   const fetchCityBoundaries = async (cityName: string) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=geojson&limit=1&city=${cityName}&polygon_geojson=1`,
//         {
//           headers: {
//             'User-Agent': 'educagriff/1.0 (gamarinbook@gmail.com)'
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Erreur de récupération des données');
//       }

//       const data: CityBoundary = await response.json();
      
//       // Vérifier si des polygones sont disponibles
//       if (data.features.length > 0 && data.features[0].geometry.type === 'Polygon') {
//         return convertToLatLng(data.features[0].geometry.coordinates);
//       }
      
//       return null;
//     } catch (error) {
//       console.error(`Erreur pour ${cityName}:`, error);
//       return null;
//     }
//   };

//   // Récupérer les frontières lors du montage du composant
//   useEffect(() => {
//     const loadBoundaries = async () => {
//       const bordeauxBoundaries = await fetchCityBoundaries('Bordeaux');
//       const beglesBoundaries = await fetchCityBoundaries('Bègles');

//       setCityBoundaries({
//         bordeaux: bordeauxBoundaries,
//         begles: beglesBoundaries
//       });
//     };

//     loadBoundaries();
//   }, []);

//   // Ajuster la vue une fois les données chargées
//   useEffect(() => {
//     if (map && cityBoundaries.bordeaux && cityBoundaries.begles) {
//       const allBoundaries = [
//         ...cityBoundaries.bordeaux.flat(),
//         ...cityBoundaries.begles.flat()
//       ];

//       const bounds = new LatLngBounds(allBoundaries);
//       map.fitBounds(bounds);
//     }
//   }, [map, cityBoundaries]);

//   return (
//     <section
//       className={`py-16 ${
//         resolvedTheme === "light"
//           ? "bg-white text-gray-900"
//           : "bg-gray-900 text-gray-100"
//       }`}
//     >
//       <h2
//         className={`text-center text-3xl font-bold mb-6 ${
//           resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
//         }`}
//       >
//         Découvrez notre zone d'intervention
//       </h2>

//       <div className="max-w-6xl mx-auto">
//         <MapContainer
//           center={center}
//           zoom={12}
//           style={{ height: "400px", width: "100%" }}
//           whenCreated={(mapInstance) => setMap(mapInstance)}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />

//           {/* Contours de Bordeaux */}
//           {cityBoundaries.bordeaux && (
//             <Polygon
//               positions={cityBoundaries.bordeaux}
//               color="red"
//               fillOpacity={0.2}
//               weight={2}
//             />
//           )}

//           {/* Contours de Bègles */}
//           {cityBoundaries.begles && (
//             <Polygon
//               positions={cityBoundaries.begles}
//               color="blue"
//               fillOpacity={0.2}
//               weight={2}
//             />
//           )}
//         </MapContainer>
//       </div>
//     </section>
//   );
// }