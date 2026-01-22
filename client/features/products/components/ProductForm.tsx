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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Image as ImageIcon, X, Plus } from "lucide-react";
import { productFormSchema, ProductFormData } from "../schemas/products.schema";
import React, { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/utils/image.utils";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useCategories } from "../../categories/hooks/useCategory";
import { useSubcategories } from "../../subcategories/hooks/useSubCategory";
import { useBrands } from "../../brands/hooks/useBrand";
import { useSections } from "../../sections/hooks/useSection";

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
  
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(
    defaultValues?.mainImage ? getImageUrl(defaultValues.mainImage as string) : null
  );
  const [imagesPreviews, setImagesPreviews] = useState<string[]>(
    defaultValues?.images ? (defaultValues.images as any[]).map(img => getImageUrl(img)) : []
  );

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
      sku: "",
      priority: 0,
      isShow: true,
      categoryId: "",
      ...defaultValues,
    },
  });

  const selectedCategoryId = form.watch("categoryId");

  // Fetch data for selections
  const { data: categories = [] } = useCategories();
  const { data: subcategories = [] } = useSubcategories({ categoryId: selectedCategoryId });
  const { data: brands = [] } = useBrands();
  const { data: sections = [] } = useSections();

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
    if (isEdit) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach(img => {
            if (img instanceof File) formData.append("images", img);
          });
        } else if (key === "mainImage" && value instanceof File) {
            formData.append("mainImage", value);
        } else if (value !== undefined) {
          formData.append(key, String(value));
        }
      });
      onSubmit(formData);
    } else {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
           value.forEach(img => {
             if (img instanceof File) formData.append("images", img);
           });
        } else if (value !== undefined) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      onSubmit(formData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t("basic_info")}</h3>
            
            <FormField
              control={form.control}
              name="nameAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name_ar")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name_ar_placeholder")} {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name_en")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name_en_placeholder")} {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("price")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oldPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("old_price")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("cost_price")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("stock")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("sku")}</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. PRD-001" {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Relationships & Status */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t("relationships")}</h3>
            
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tCommon("category")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder={tCommon("select_category")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {locale === "ar" ? cat.nameAr : cat.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tCommon("subcategory")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder={tCommon("select_subcategory")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories.map((sub) => (
                        <SelectItem key={sub._id} value={sub._id}>
                          {locale === "ar" ? sub.nameAr : sub.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tCommon("brand")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-12">
                          <SelectValue placeholder={tCommon("select_brand")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand._id} value={brand._id}>
                            {locale === "ar" ? brand.nameAr : brand.nameEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tCommon("section")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-12">
                          <SelectValue placeholder={tCommon("select_section")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sections.map((section) => (
                          <SelectItem key={section._id} value={section._id}>
                            {locale === "ar" ? section.nameAr : section.nameEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tCommon("priority")}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isShow"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end pb-2">
                    <FormLabel className="mb-2">{tCommon("show_on_store")}</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="descriptionAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("description_ar")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("description_ar_placeholder")}
                    className="rounded-xl min-h-[120px]"
                    {...field}
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
                <FormLabel>{t("description_en")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("description_en_placeholder")}
                    className="rounded-xl min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {submitLabel || tCommon("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
