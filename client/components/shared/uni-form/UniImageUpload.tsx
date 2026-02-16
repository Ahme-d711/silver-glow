"use client";

import React from "react";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface UniImageUploadProps {
  label: string;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  className?: string;
  cardClassName?: string;
}

export function UniImageUpload({
  label,
  preview,
  onImageChange,
  onRemoveImage,
  fileInputRef,
  className,
  cardClassName,
}: UniImageUploadProps) {
  const tCommon = useTranslations("Common");

  return (
    <div className={cn("space-y-6", className)}>
      <Card className={cn("p-6 rounded-[24px] border border-divider shadow-none", cardClassName)}>
        <h3 className="text-lg font-semibold text-content-primary mb-4">{label}</h3>
        
        <FormItem className="space-y-1">
          <FormLabel className="text-content-secondary text-base">{label}</FormLabel>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={onImageChange}
            />
            
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-divider/50 rounded-[24px] p-8 flex flex-col items-center justify-center bg-background cursor-pointer hover:bg-background/10 transition-all min-h-[240px]"
              >
                <div className="bg-primary/10 p-4 rounded-xl mb-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-content-tertiary text-center mb-4 px-4">
                  {tCommon("drag_drop_image")}
                </p>
                <Button 
                  type="button"
                  className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer rounded-xl px-6 h-11 font-semibold shadow-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  {tCommon("add_image")}
                </Button>
              </div>
            ) : (
              <div className="relative rounded-[24px] overflow-hidden group border border-divider">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-10 w-10 rounded-full shadow-lg"
                    onClick={onRemoveImage}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </FormItem>
      </Card>
    </div>
  );
}
