import React, { useState } from "react";
import { fetchBuildingInsights } from "../services/googleSolarAPI ";

interface BuildingInsights {
  location: string;
  dimensions: { width: number; height: number; depth: number };
  solarPotential: number;
}

const BuildingInsightsPage: React.FC = () => {
  const [buildingInsights, setBuildingInsights] =
    useState<BuildingInsights | null>(null);

  const handleFetchData = async () => {
    const location = "40.748817,-73.985428"; // Example location
    try {
      const insights = await fetchBuildingInsights(location);
      setBuildingInsights(insights);
    } catch (error) {
      console.error("Error fetching building insights:", error);
    }
  };

  return (
    <div>
      <h1>Building Insights</h1>
      <button onClick={handleFetchData}>Fetch Building Insights</button>
      {buildingInsights && (
        <div>
          <h2>Insights Data</h2>
          <pre>{JSON.stringify(buildingInsights, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BuildingInsightsPage;
