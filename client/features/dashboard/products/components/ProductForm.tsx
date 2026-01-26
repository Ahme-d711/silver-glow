"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniTextarea } from "@/components/shared/uni-form/UniTextarea";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { UniAsyncCombobox } from "@/components/shared/uni-form/UniAsyncCombobox";
import { UniSwitch } from "@/components/shared/uni-form/UniSwitch";
import { Button } from "@/components/ui/button";
import { Loader, Image as ImageIcon, X, Plus } from "lucide-react";
import { productFormSchema, ProductFormData } from "../schemas/products.schema";
import React, { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/utils/image.utils";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { getAllCategories as getAllCategoriesApi } from "../../categories/services/category.service";
import { getAllSubcategories as getAllSubcategoriesApi } from "../../subcategories/services/subcategory.service";
import { getAllBrands as getAllBrandsApi } from "../../brands/services/brand.service";
import { getAllSections as getAllSectionsApi } from "../../sections/services/section.service";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (values: ProductFormData | FormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  isLoading,
  onCancel,
  submitLabel,
  isEdit,
}: ProductFormProps) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (defaultValues?.mainImage) {
      if (defaultValues.mainImage instanceof File) {
        setMainImagePreview(URL.createObjectURL(defaultValues.mainImage));
      } else {
        setMainImagePreview(getImageUrl(defaultValues.mainImage as string));
      }
    } else {
      setMainImagePreview(null);
    }

    if (defaultValues?.images) {
      const urls = (defaultValues.images as (string | File)[])
        .map((img) =>
          img instanceof File ? URL.createObjectURL(img) : getImageUrl(img)
        )
        .filter((url): url is string => url !== null);
      setImagesPreviews(urls);
    } else {
      setImagesPreviews([]);
    }
  }, [defaultValues?.mainImage, defaultValues?.images]);

  const mainImageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      nameAr: "",
      nameEn: "",
      descriptionAr: "",
      descriptionEn: "",
      price: 0,
      oldPrice: 0,
      costPrice: 0,
      stock: 0,
      priority: 0,
      isShow: true,
      categoryId: "",
      ...defaultValues,
    },
  });

  const selectedCategoryId = form.watch("categoryId");

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("mainImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentImages = form.getValues("images") || [];
      form.setValue("images", [...currentImages, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagesPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImagePreview = (index: number) => {
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
    const currentImages = form.getValues("images") || [];
    form.setValue("images", currentImages.filter((_, i) => i !== index));
  };

  const onFormSubmit = (values: ProductFormData) => {
    const formData = new FormData();
    
    // Iterate over all keys in values
    (Object.keys(values) as Array<keyof ProductFormData>).forEach((key) => {
      const value = values[key];
      
      if (value === undefined || value === null) return;

      if (key === "images" && Array.isArray(value)) {
        value.forEach((img) => {
          if (img instanceof File) {
            formData.append("images", img);
          } else if (typeof img === "string") {
            // If it's an existing image URL/path, we might store it as a hidden field or handle it differently
            // Usually for multiple images, if you send back existing ones it depends on backend logic
            formData.append("existingImages", img);
          }
        });
      } else if (key === "mainImage") {
        if (value instanceof File) {
          formData.append("mainImage", value);
        } else if (typeof value === "string") {
          formData.append("mainImage", value);
        }
      } else {
        formData.append(key, String(value));
      }
    });

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t("basic_info")}</h3>
            
            <div className="space-y-6">
              <UniInput
                control={form.control}
                name="nameAr"
                label={t("name_ar")}
                placeholder={t("name_ar_placeholder")}
                required
              />

              <UniInput
                control={form.control}
                name="nameEn"
                label={t("name_en")}
                placeholder={t("name_en_placeholder")}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <UniInput
                  control={form.control}
                  name="price"
                  label={t("price")}
                  type="number"
                  required
                />
                <UniInput
                  control={form.control}
                  name="oldPrice"
                  label={t("old_price")}
                  type="number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <UniInput
                  control={form.control}
                  name="costPrice"
                  label={t("cost_price")}
                  type="number"
                />
                <UniInput
                  control={form.control}
                  name="stock"
                  label={t("stock")}
                  type="number"
                  required
                />
              </div>
            </div>


          </div>

          {/* Relationships & Status */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t("relationships")}</h3>
            
            <div className="space-y-6">
              <UniAsyncCombobox
                control={form.control}
                name="categoryId"
                label={tCommon("category")}
                placeholder={tCommon("select_category")}
                searchPlaceholder={tCommon("search")}
                fetchData={async (search) => {
                  const res = await getAllCategoriesApi({ search });
                  return res.data?.categories || [];
                }}
                getItemLabel={(item) => locale === "ar" ? item.nameAr : item.nameEn}
                getItemValue={(item) => item._id}
                required
              />

              <UniAsyncCombobox
                control={form.control}
                name="subCategoryId"
                label={tCommon("subcategory")}
                placeholder={tCommon("select_subcategory")}
                searchPlaceholder={tCommon("search")}
                fetchData={async (search) => {
                  const res = await getAllSubcategoriesApi({ search, categoryId: selectedCategoryId });
                  return res.data?.subcategories || [];
                }}
                getItemLabel={(item) => locale === "ar" ? item.nameAr : item.nameEn}
                getItemValue={(item) => item._id}
                disabled={!selectedCategoryId}
              />

              <div className="grid grid-cols-2 gap-4">
                <UniAsyncCombobox
                  control={form.control}
                  name="brandId"
                  label={tCommon("brand")}
                  placeholder={tCommon("select_brand")}
                  searchPlaceholder={tCommon("search")}
                  fetchData={async (search) => {
                    const res = await getAllBrandsApi({ search });
                    return res.data?.brands || [];
                  }}
                  getItemLabel={(item) => locale === "ar" ? item.nameAr : item.nameEn}
                  getItemValue={(item) => item._id}
                />
                <UniAsyncCombobox
                  control={form.control}
                  name="sectionId"
                  label={tCommon("section")}
                  placeholder={tCommon("select_section")}
                  searchPlaceholder={tCommon("search")}
                  fetchData={async (search) => {
                    const res = await getAllSectionsApi({ search });
                    return res.data?.sections || [];
                  }}
                  getItemLabel={(item) => locale === "ar" ? item.nameAr : item.nameEn}
                  getItemValue={(item) => item._id}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <UniInput
                  control={form.control}
                  name="priority"
                  label={tCommon("priority")}
                  type="number"
                />
                <UniSwitch
                  control={form.control}
                  name="isShow"
                  label={tCommon("show_on_store")}
                  className="p-3 border-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UniTextarea
            control={form.control}
            name="descriptionAr"
            label={t("description_ar")}
            placeholder={t("description_ar_placeholder")}
            className="md:col-span-1"
          />

          <UniTextarea
            control={form.control}
            name="descriptionEn"
            label={t("description_en")}
            placeholder={t("description_en_placeholder")}
            className="md:col-span-1"
          />
        </div>
        </div>

        {/* Media */}
        <div className="space-y-6">
           <h3 className="text-lg font-semibold">{t("media")}</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
               <FormLabel>{t("main_image")}</FormLabel>
               <div 
                 onClick={() => mainImageRef.current?.click()}
                 className="relative h-48 w-full border-2 border-dashed border-divider rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors overflow-hidden"
               >
                 {mainImagePreview ? (
                   <Image src={mainImagePreview} alt="Preview" fill className="object-cover" />
                 ) : (
                   <>
                    <ImageIcon className="h-10 w-10 text-neutral-300 mb-2" />
                    <span className="text-sm text-neutral-500">{tCommon("upload_image")}</span>
                   </>
                 )}
               </div>
               <input
                 type="file"
                 ref={mainImageRef}
                 className="hidden"
                 accept="image/*"
                 onChange={handleMainImageChange}
               />
             </div>

             <div className="md:col-span-2 space-y-2">
               <FormLabel>{t("additional_images")}</FormLabel>
               <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                 {imagesPreviews.map((preview, index) => (
                   <div key={index} className="relative h-24 w-full rounded-xl overflow-hidden group">
                     <Image src={preview} alt={`Preview ${index}`} fill className="object-cover" />
                     <button
                       type="button"
                       onClick={() => removeImagePreview(index)}
                       className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <X className="h-4 w-4 text-destructive" />
                     </button>
                   </div>
                 ))}
                 <button
                   type="button"
                   onClick={() => imagesRef.current?.click()}
                   className="h-24 w-full border-2 border-dashed border-divider rounded-xl flex items-center justify-center hover:bg-neutral-50 transition-colors"
                 >
                   <Plus className="h-6 w-6 text-neutral-300" />
                 </button>
               </div>
               <input
                 type="file"
                 ref={imagesRef}
                 className="hidden"
                 accept="image/*"
                 multiple
                 onChange={handleImagesChange}
               />
             </div>
           </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl h-12 px-8"
            onClick={onCancel}
          >
            {tCommon("cancel")}
          </Button>
          <Button
            type="submit"
            className="rounded-xl h-12 px-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {submitLabel || tCommon("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
