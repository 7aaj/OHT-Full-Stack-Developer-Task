import ImageFile from "../types/imagesTypes";

export const removeImage = (
  index: number,
  addedImagesAndPendingImages: ImageFile[],
  setPendingImages: React.Dispatch<React.SetStateAction<ImageFile[]>>
) => {
  const updatedImages: ImageFile[] = addedImagesAndPendingImages.filter(
    (_, i) => i !== index
  );

  setPendingImages(updatedImages);
};
