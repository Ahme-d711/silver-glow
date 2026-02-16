"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniTextarea } from "@/components/shared/uni-form/UniTextarea";
import { UniSwitch } from "@/components/shared/uni-form/UniSwitch";
import { UniImageUpload } from "@/components/shared/uni-form/UniImageUpload";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { getBrandFormSchema, BrandFormData } from "../schemas/brands.schema";
import React, { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/utils/image.utils";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

interface BrandFormProps {
  defaultValues?: Partial<BrandFormData & { logo?: string }>;
  onSubmit: (values: BrandFormData | FormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export function BrandForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Submit",
  isEdit = false,
}: BrandFormProps) {
  const t = useTranslations("Brands");
  const tCommon = useTranslations("Common");
  const tValidation = useTranslations("Validation");
  
  const initialPreview = getImageUrl(defaultValues?.logo);

  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BrandFormData>({
    resolver: zodResolver(getBrandFormSchema(tValidation)) as unknown as Resolver<BrandFormData>,
    defaultValues: {
      nameAr: defaultValues?.nameAr || "",
      nameEn: defaultValues?.nameEn || "",
      descriptionAr: defaultValues?.descriptionAr || "",
      descriptionEn: defaultValues?.descriptionEn || "",
      priority: defaultValues?.priority || 0,
      isShow: defaultValues?.isShow ?? true,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        nameAr: defaultValues.nameAr || "",
        nameEn: defaultValues.nameEn || "",
        descriptionAr: defaultValues.descriptionAr || "",
        descriptionEn: defaultValues.descriptionEn || "",
        priority: defaultValues.priority || 0,
        isShow: defaultValues.isShow ?? true,
      });
      setPreview(getImageUrl(defaultValues.logo));
    }
  }, [defaultValues, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setSelectedFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (values: BrandFormData) => {
    if (selectedFile) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });
      formData.append("logo", selectedFile);
      onSubmit(formData);
    } else {
      onSubmit(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Logo */}
        <div className="lg:col-span-4">
          <UniImageUpload
            label={t("brand_logo")}
            preview={preview}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
            fileInputRef={fileInputRef}
          />
        </div>

        {/* Right Section - General Information */}
        <div className="lg:col-span-8">
          <Card className="p-8 rounded-[32px] border border-divider shadow-none">
            <h3 className="text-xl font-semibold text-content-primary mb-6">{tCommon("general_info")}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UniInput
                control={form.control}
                name="nameAr"
                label={t("brand_name_ar")}
                placeholder={t("brand_name_ar")}
                required
              />
              
              <UniInput
                control={form.control}
                name="nameEn"
                label={t("brand_name_en")}
                placeholder={t("brand_name_en")}
                required
              />

              <UniTextarea
                control={form.control}
                name="descriptionAr"
                label={t("brand_description_ar")}
                placeholder={t("brand_description_ar")}
              />

              <UniTextarea
                control={form.control}
                name="descriptionEn"
                label={t("brand_description_en")}
                placeholder={t("brand_description_en")}
              />

              <UniInput
                control={form.control}
                name="priority"
                label={t("priority")}
                type="number"
                placeholder="0"
              />

              <div className="flex items-center h-full pt-8">
                <UniSwitch
                  control={form.control}
                  name="isShow"
                  label={t("status")}
                  disabled={isLoading}
                />
              </div>
            </div>
          </Card>

          <div className="mt-8 flex justify-end gap-4">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
                className="h-12 px-8 rounded-xl border-divider font-bold text-content-secondary cursor-pointer disabled:opacity-50"
              >
                {tCommon("cancel")}
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-12 rounded-xl bg-primary text-white font-bold cursor-pointer disabled:opacity-50"
            >
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
