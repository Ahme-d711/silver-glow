import { useRef, useState, type ChangeEvent } from "react";
import type { UseFormReturn } from "react-hook-form";
import { getImageUrl } from "@/utils/image.utils";

export function useUserPictureUpload(
  defaultPicture?: string,
  setPictureValue?: UseFormReturn<{ picture?: string }>["setValue"]
) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const preview = filePreview ?? getImageUrl(defaultPicture);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFilePreview(null);
    setSelectedFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPictureValue?.("picture", "");
  };

  return {
    preview,
    fileInputRef,
    selectedFile,
    handleImageChange,
    removeImage,
  };
}
