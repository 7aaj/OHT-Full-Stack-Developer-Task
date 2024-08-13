import * as React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useImageContext } from "../context/ImageContext";
import { removeImage } from "../utils/imagesActions"; // Make sure to update this import path accordingly
import name from "../assets/name.png";
import noData from "../assets/noData.png";

export default function Gallery() {
  const { images, setImages } = useImageContext(); // Get images and the setter
  const noImagesYet = images.length === 0;

  const handleRemoveImage = (index: number) => {
    removeImage(index, images, setImages); // Use the removeImage function
  };

  return (
    <div className="">
      <div className="w-full">
        <img src={name} alt="Gallery Name" />
      </div>
      <div className="flex justify-between px-10">
        <h2 className="font-bold text-xl">Projects</h2>
        <Button
          style={{
            backgroundColor: "#ffc531",
          }}
          variant="contained"
        >
          <Link to={"/addImages"}>Add Images</Link>
        </Button>
      </div>
      {noImagesYet ? (
        <div className="flex justify-center">
          <img src={noData} alt="No Data Available" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 px-10 py-3">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                className="w-full h-full"
                src={img.preview}
                alt="Project Image"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#1c1b1f",
                  color: "white",
                  border: "none",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
