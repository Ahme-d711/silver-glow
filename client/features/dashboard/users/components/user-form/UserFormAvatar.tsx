"use client";

import { Camera, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserFormAvatarProps } from "../../types/user-form.types";

export function UserFormAvatar({
  preview,
  fileInputRef,
  onImageChange,
  onRemoveImage,
}: UserFormAvatarProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 pb-4">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-divider shadow-sm">
          {preview && (
            <AvatarImage src={preview} alt="Profile preview" className="object-cover" />
          )}
          <AvatarFallback className="bg-secondary text-primary">
            <Camera className="h-10 w-10 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/90 transition-all border-2 border-white"
        >
          <Camera className="h-4 w-4" />
        </button>

        {preview && (
          <button
            type="button"
            onClick={onRemoveImage}
            className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-1 shadow-md hover:bg-destructive/90 transition-colors border-2 border-white"
          >
            <X className="h-3 w-3" />
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
