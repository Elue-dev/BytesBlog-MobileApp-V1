import { CLOUD_NAME, UPLOAD_PRESET } from "../utils";
import { throwError } from "./throwAlert";

export async function uploadImageToCloud(image) {
  console.log("UPLOADING...");
  let imageUrl;
  try {
    if (image) {
      const img = new FormData();
      img.append("file", {
        uri: image,
        type: "image/jpeg",
        name: "avatar.jpg",
      });
      img.append("cloud_name", CLOUD_NAME);
      img.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: img }
      );

      const imageData = await response.json();
      if (
        imageData.error.message ||
        imageData.error.message.includes("File size too large")
      )
        return throwError("Image size too large, Please use a smaller image");

      imageUrl = imageData?.url?.toString();
      console.log("Image uploaded successfully:", imageUrl);
      return imageUrl;
    } else {
      throwError("Missing Image", "No image selected.");
    }
  } catch (error) {
    console.log(error);
    throwError(error.message);
  }
}
