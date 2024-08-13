// src/GeoTiffPage.tsx
import React, { useState } from "react";
import { fetchGeoTiff } from "../services/googleSolarAPI ";

const GeoTiffPage: React.FC = () => {
  const [geoTiff, setGeoTiff] = useState<string | null>(null);

  const handleFetchData = async () => {
    const location = "40.748817,-73.985428";
    try {
      const tiffData = await fetchGeoTiff(location);
      setGeoTiff(URL.createObjectURL(tiffData));
    } catch (error) {
      console.error("Error fetching geoTiff data:", error);
    }
  };

  return (
    <div>
      <h1>GeoTIFF Data</h1>
      <button onClick={handleFetchData}>Fetch GeoTIFF Data</button>
      {geoTiff && (
        <div>
          <h2>GeoTIFF Data</h2>
          <img src={geoTiff} alt="GeoTIFF Data" />
        </div>
      )}
    </div>
  );
};

export default GeoTiffPage;
