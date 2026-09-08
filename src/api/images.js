import { request } from "./client";

export function uploadImage(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("image", file);

  return request({
    method: "POST",
    url: "/images/upload",
    data: formData,
    onUploadProgress,
  });
}
