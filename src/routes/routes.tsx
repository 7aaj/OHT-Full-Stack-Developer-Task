import { createBrowserRouter } from "react-router-dom";
import BuildingInsightsPage from "../components/BuildingInsightsPage";
import DataLayersPage from "../components/DataLayersPage";
import Gallery from "../components/Gallery";
import GeoTiffPage from "../components/GeoTiffPage";
import MyDropzone from "../components/MyDropzone";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Gallery />,
    index: true,
  },
  {
    path: "/addImages",
    element: <MyDropzone />,
    index: true,
  },
  {
    path: "/building-insights",
    element: <BuildingInsightsPage />,
    index: true,
  },
  {
    path: "/data-layers",
    element: <DataLayersPage />,
    index: true,
  },
  {
    path: "/geo-tiff",
    element: <GeoTiffPage />,
    index: true,
  },
]);
