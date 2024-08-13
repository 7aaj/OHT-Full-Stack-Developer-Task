import React, { useState } from "react";
import { fetchDataLayers } from "../services/googleSolarAPI ";

interface DataLayers {
  urls: string[];
}

const DataLayersPage: React.FC = () => {
  const [dataLayers, setDataLayers] = useState<DataLayers | null>(null);

  const handleFetchData = async () => {
    const location = "40.748817,-73.985428";
    try {
      const layers = await fetchDataLayers(location);
      setDataLayers(layers);
    } catch (error) {
      console.error("Error fetching data layers:", error);
    }
  };

  return (
    <div>
      <h1>Data Layers</h1>
      <button onClick={handleFetchData}>Fetch Data Layers</button>
      {dataLayers && (
        <div>
          <h2>Data Layers URLs</h2>
          <pre>{JSON.stringify(dataLayers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataLayersPage;
