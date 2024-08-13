import { RouterProvider } from "react-router-dom";
import "./App.css";
import sidebar from "./assets/Closed won.png";
import header from "./assets/header.png";

import { ImageProvider } from "./context/ImageContext";
import { router } from "./routes/routes";

function App() {
  return (
    <ImageProvider>
      <div className="App">
        <header className="w-full">
          <img className="w-full" src={header} alt="" />
        </header>
        <div className="flex">
          <div className="">
            <img className="w-full" src={sidebar} alt="" />
          </div>
          <div className="flex flex-col flex-1">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </ImageProvider>
  );
}

export default App;
