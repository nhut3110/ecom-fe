import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

interface MapboxProps extends React.HTMLAttributes<HTMLDivElement> {
  lat?: number;
  lng?: number;
  zoom?: number;
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
// "pk.eyJ1IjoidHdpZ2JhbmciLCJhIjoiY2x2eG80enNzMmxldzJpcDYyaG56Y2gxOCJ9.7OzJrjGjQUYrj50f7sHpRg";

export const Mapbox = (props: MapboxProps) => {
  const { lat = 42.35, lng = -70.9, zoom = 18, ...rest } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // Initialize the map on first render
  useEffect(() => {
    if (mapContainer.current === null) return;

    // Initialize Mapbox map
    const mapInstance = new mapboxgl.Map({
      center: [lng, lat],
      zoom: zoom,
      pitch: 45,
      bearing: -17.6,
      container: mapContainer.current,
      antialias: true,
    });

    mapInstance.on("style.load", () => {
      mapInstance.addSource("line", {
        type: "geojson",
        lineMetrics: true,
        data: {
          type: "LineString",
          coordinates: [
            [2.293389857555951, 48.85896319631851],
            [2.2890810326441624, 48.86174223718291],
          ],
        },
      });

      mapInstance.addLayer({
        id: "line",
        source: "line",
        type: "line",
        paint: {
          "line-width": 12,
          "line-emissive-strength": 0.8,
          "line-gradient": [
            "interpolate",
            ["linear"],
            ["line-progress"],
            0,
            "red",
            1,
            "blue",
          ],
        },
      });
    });

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    mapInstance.addControl(nav, "bottom-right");

    // Create the initial marker
    const marker = new mapboxgl.Marker({ color: "black" })
      .setLngLat([lng, lat])
      .addTo(mapInstance)
      .setPopup(new mapboxgl.Popup().setHTML("<h1>You are here!</h1>"));

    // Store references to the map and marker
    setMap(mapInstance);
    markerRef.current = marker;

    // Clean up the map instance on component unmount
    return () => mapInstance.remove();
  }, []);

  // Update the map and marker whenever lng, lat, or zoom changes
  useEffect(() => {
    if (map) {
      map.flyTo({
        center: [lng, lat],
        essential: true,
      });

      // Update the marker position
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      }
    }
  }, [map, lng, lat, zoom]);

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 z-10 m-3 rounded-md bg-gray-400 px-3 py-2 text-white">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div
        {...rest}
        ref={mapContainer}
        style={{ width: "100%", height: "100vh", ...rest.style }}
      />
    </div>
  );
};
