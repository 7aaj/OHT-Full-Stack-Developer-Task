import EastIcon from "@mui/icons-material/East";
import React, { useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import dropZone from "../assets/dropZone.png";
import PopUpModal from "../components/PopUpModal";
import { useImageContext } from "../context/ImageContext";
import ImageFile from "../types/imagesTypes";
import { removeImage } from "../utils/imagesActions";

const ImageUploader: React.FC = () => {
  const { images, setImages } = useImageContext();
  const [pendingImages, setPendingImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const maxFilesPerUpload = 5;
  const maxTotalImages = 15;

  const handleDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    setError("");
    setSuccess("");

    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    ) as ImageFile[];
    const totalImages =
      images.length + pendingImages.length + acceptedFiles.length;

    if (pendingImages.length + newImages.length > maxFilesPerUpload) {
      setError(
        `You can only upload up to ${maxFilesPerUpload} images at a time.`
      );
      return;
    }

    if (totalImages > maxTotalImages) {
      setError(`You can only have a total of ${maxTotalImages} images.`);
      return;
    }

    setPendingImages([...pendingImages, ...newImages]);

    if (fileRejections.length > 0) {
      setError("Only PNG, JPG, and JPEG formats are supported.");
    }
  };

  const addImages = () => {
    if (pendingImages.length === 0) {
      setSuccess("");
      setError("Please add images before proceeding.");
      return;
    }

    setImages([...images, ...pendingImages]);
    setPendingImages([]);
    setError("");
    setSuccess("Images successfully added.");
  };

  const discardChanges = () => {
    pendingImages.forEach((image) => URL.revokeObjectURL(image.preview));
    setPendingImages([]);
    setError("");
    setSuccess("Changes discarded.");
  };

  const removeImageAction = (index: number) => {
    removeImage(index, pendingImages, setPendingImages);
  };

  const accept: Accept = {
    "image/png": [],
    "image/jpeg": [],
    "image/jpg": [],
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: handleDrop,
  });

  return (
    <div className="px-10">
      <div className="flex gap-2 mb-5">
        <Link to={"/"}>My Portfolio</Link>
        <EastIcon />
        <div className="">Add New Project</div>
      </div>
      {error && (
        <div className="bg-[#fee2e2] text-[red] py-3 px-5 mb-5">{error}</div>
      )}
      {success && (
        <div className="bg-[#d1fae5] text-[#16a34a] py-3 px-5 mb-5">
          {success}
        </div>
      )}
      <div className="border-2 border-[#ecf0f4]">
        <div className="p-5">
          <h2 className="text-4xl font-bold pb-4">Add New Images</h2>
          <p>Add images from your projects to be viewed by the homeowner</p>
        </div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="w-full p-5">
            <p className="pb-2">Add images of your project</p>
            <img className="w-full" src={dropZone} alt="Drop Zone" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-5">
          {pendingImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image.preview} alt="preview" />
              <button
                onClick={() => removeImageAction(index)}
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
      </div>
      <div className="flex gap-x-3 p-5">
        <PopUpModal
          style={{
            backgroundColor: "#112532",
            color: "white",
            border: "none",
            fontWeight: "600",
          }}
          addImages={addImages}
          buttonText="Add Images"
        />
        <PopUpModal
          style={{
            backgroundColor: "transparent",
            border: "#112532 1px solid",
            color: "#112532",
            fontWeight: "600",
          }}
          discardChanges={discardChanges}
          buttonText="Discard Changes"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
