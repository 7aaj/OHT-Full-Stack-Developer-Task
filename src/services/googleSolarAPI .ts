import axios from "axios";

const API_KEY = process.env.API_KEY;

interface BuildingInsights {
  location: string;
  dimensions: { width: number; height: number; depth: number };
  solarPotential: number;
}

interface DataLayers {
  urls: string[];
}

export const fetchBuildingInsights = async (
  location: string
): Promise<BuildingInsights> => {
  const url = `https://maps.googleapis.com/maps/api/solar/buildingInsights?location=${location}&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching building insights:", error);
    throw error;
  }
};

export const fetchDataLayers = async (
  location: string
): Promise<DataLayers> => {
  const url = `https://maps.googleapis.com/maps/api/solar/dataLayers?location=${location}&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data layers:", error);
    throw error;
  }
};

export const fetchGeoTiff = async (location: string): Promise<Blob> => {
  const url = `https://maps.googleapis.com/maps/api/solar/geoTiff?location=${location}&key=${API_KEY}`;
  try {
    const response = await axios.get(url, { responseType: "blob" });
    return response.data;
  } catch (error) {
    console.error("Error fetching geoTiff data:", error);
    throw error;
  }
};
