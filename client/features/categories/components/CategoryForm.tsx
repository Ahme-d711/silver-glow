"use client";

import { useForm, Control, FieldValues, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/shared/FormInputField";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, X } from "lucide-react";
import { categorySchema, CategoryFormValues } from "../schemas/category.schema";
import React, { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/utils/image.utils";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormValues>;
  onSubmit: (values: CategoryFormValues | FormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export function CategoryForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Submit",
  isEdit = false,
}: CategoryFormProps) {
  const t = useTranslations("Categories");
  const tCommon = useTranslations("Common");
  
  const initialPreview = getImageUrl(defaultValues?.image);

  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as unknown as Resolver<CategoryFormValues>,
    defaultValues: {
      nameAr: defaultValues?.nameAr || "",
      nameEn: defaultValues?.nameEn || "",
      descriptionAr: defaultValues?.descriptionAr || "",
      descriptionEn: defaultValues?.descriptionEn || "",
      priority: defaultValues?.priority || 0,
      image: defaultValues?.image || "",
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
        image: defaultValues.image || "",
        isShow: defaultValues.isShow ?? true,
      });
      setPreview(getImageUrl(defaultValues.image));
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
      form.setValue("image", "new-image"); // Just to trigger validation if needed, though schema might treat string as url
    }
  };

  const removeImage = () => {
    setPreview(null);
    setSelectedFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    form.setValue("image", "");
  };

  const handleSubmit = (values: CategoryFormValues) => {
    if (selectedFile) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });
      formData.append("image", selectedFile);
      onSubmit(formData);
    } else {
      onSubmit(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Photo */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 rounded-[24px] border border-divider shadow-none">
            <h3 className="text-lg font-semibold text-content-primary mb-4">{tCommon("category_image")}</h3>
            
            <FormItem className="space-y-1">
              <FormLabel className="text-content-secondary text-base">{tCommon("category_image")}</FormLabel>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
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
                        onClick={removeImage}
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

        {/* Right Section - General Information */}
        <div className="lg:col-span-8">
          <Card className="p-8 rounded-[32px] border border-divider shadow-none">
            <h3 className="text-xl font-semibold text-content-primary mb-6">{tCommon("general_info")}</h3>
            
            <div className="space-y-6">
              <FormInputField
                control={form.control as unknown as Control<FieldValues>}
                name="nameAr"
                label={t("category_name_ar")}
                placeholder={t("category_name_ar")}
                required
                className="space-y-1"
                inputClassName="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none"
              />
              
              <FormInputField
                control={form.control as unknown as Control<FieldValues>}
                name="nameEn"
                label={t("category_name_en")}
                placeholder={t("category_name_en")}
                required
                className="space-y-1"
                inputClassName="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none"
              />

              <FormField
                control={form.control}
                name="descriptionAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-content-secondary">{t("category_description_ar")}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t("category_description_ar")}
                        className="min-h-[100px] rounded-xl border-divider/50 focus:border-primary px-4 shadow-none resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descriptionEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-content-secondary">{t("category_description_en")}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t("category_description_en")}
                        className="min-h-[100px] rounded-xl border-divider/50 focus:border-primary px-4 shadow-none resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormInputField
                control={form.control as unknown as Control<FieldValues>}
                name="priority"
                label={t("priority")}
                type="number"
                placeholder="0"
                className="space-y-1"
                inputClassName="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none"
              />

              <FormField
                control={form.control}
                name="isShow"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between gap-4 p-4 border border-divider/50 rounded-xl">
                    <FormLabel className="text-base text-primary font-semibold cursor-pointer flex-1">
                      {t("status")}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
