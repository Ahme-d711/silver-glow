"use client"

import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Image as ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { adSchema, type AdFormValues } from "../schemas/adSchemas"
import { useTranslations } from "next-intl"

import { AsyncCombobox } from "@/components/shared/AsyncCombobox"
import { getAllProducts } from "@/features/dashboard/products/services/product.service"
import type { Ad } from "../types"

interface AdFormProps {
  initialData?: Partial<Ad>
  onSubmit: (data: FormData) => void
  onCancel?: () => void
  isLoading?: boolean
}

export function AdForm({ initialData, onSubmit, onCancel, isLoading = false }: AdFormProps) {
  const t = useTranslations("Common")
  const tAds = useTranslations("Ads")
  const tOrders = useTranslations("Orders")
  
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.photo ? (initialData.photo.startsWith('http') || initialData.photo.startsWith('/') ? initialData.photo : `/${initialData.photo}`) : null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const productIdValue = initialData?.productId;
  const initialProductId = typeof productIdValue === 'object' && productIdValue !== null
    ? (productIdValue as { _id: string })._id
    : (productIdValue as string) || "";

  const form = useForm<AdFormValues>({
    resolver: zodResolver(adSchema) as unknown as any,
    defaultValues: {
      nameAr: initialData?.nameAr || "",
      nameEn: initialData?.nameEn || "",
      descriptionAr: initialData?.descriptionAr || "",
      descriptionEn: initialData?.descriptionEn || "",
      isShown: initialData?.isShown ?? true,
      priority: Number(initialData?.priority) || 0,
      link: initialData?.link || "",
      productId: initialProductId,
      photo: initialData?.photo || undefined,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue("photo", file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    form.setValue("photo", undefined)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleFormSubmit = (values: AdFormValues) => {
    const formData = new FormData()
    formData.append("nameAr", values.nameAr)
    formData.append("nameEn", values.nameEn)
    if (values.descriptionAr) formData.append("descriptionAr", values.descriptionAr)
    if (values.descriptionEn) formData.append("descriptionEn", values.descriptionEn)
    formData.append("isShown", String(values.isShown))
    formData.append("priority", String(values.priority))
    if (values.link) formData.append("link", values.link)
    if (values.productId) formData.append("productId", values.productId)
    
    if (values.photo instanceof File) {
      formData.append("photo", values.photo)
    }

    onSubmit(formData)
  }

  const fetchProducts = async (search: string) => {
    const response = await getAllProducts({ search, limit: 10 });
    return Array.isArray(response) ? response : [];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Photo */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 rounded-[24px] border border-divider shadow-none">
            <h3 className="text-lg font-semibold text-content-primary mb-4">{t("photo")}</h3>
            
            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-content-secondary text-base">{t("photo")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />
                      
                      {!imagePreview ? (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-divider/50 rounded-[24px] p-8 flex flex-col items-center justify-center bg-background cursor-pointer hover:bg-background/10 transition-all min-h-[240px]"
                        >
                          <div className="bg-primary/10 p-4 rounded-xl mb-4">
                            <ImageIcon className="h-8 w-8 text-primary" />
                          </div>
                          <p className="text-sm text-content-tertiary text-center mb-4 px-4">
                            {t("drag_drop_image")}
                          </p>
                          <Button 
                            type="button"
                            className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer rounded-xl px-6 h-11 font-semibold shadow-none"
                            onClick={(e) => {
                              e.stopPropagation()
                              fileInputRef.current?.click()
                            }}
                          >
                            {t("add_image")}
                          </Button>
                        </div>
                      ) : (
                        <div className="relative rounded-[24px] overflow-hidden group border border-divider">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={imagePreview} 
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>

        {/* Right Section - General Information */}
        <div className="lg:col-span-8">
          <Card className="p-8 rounded-[32px] border border-divider shadow-none">
            <h3 className="text-xl font-semibold text-content-primary mb-6">{t("general_info")}</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nameAr"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base text-content-secondary">{t("name_ar")}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none" 
                          placeholder={t("enter_name_ar")} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nameEn"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base text-content-secondary">{t("name_en")}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none" 
                          placeholder={t("enter_name_en")} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="descriptionAr"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base text-content-secondary">{t("description_ar")}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none" 
                          placeholder={t("description_ar")} 
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
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base text-content-secondary">{t("description_en")}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none" 
                          placeholder={t("description_en")} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base text-content-secondary">{t("priority")}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          className="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base text-content-secondary">{t("link")} ({t("optional")})</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none" 
                          placeholder="https://..." 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex flex-col">
                      <FormLabel className="text-base text-content-secondary">{tOrders("product")} ({t("optional")})</FormLabel>
                      <FormControl>
                        <AsyncCombobox
                          value={field.value}
                          onValueChange={field.onChange}
                          fetchData={fetchProducts}
                          placeholder={tOrders("select_product")}
                          searchPlaceholder={t("search")}
                          emptyMessage={t("no_data")}
                          getItemLabel={(product) => product.nameAr || product.nameEn}
                          className="h-12 border-divider/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isShown"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5 rounded border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                      />
                    </FormControl>
                    <FormLabel className="text-base font-semibold text-content-primary cursor-pointer">
                      {t("is_show")}
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <div className="mt-8 flex justify-end gap-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-12 rounded-xl bg-primary text-white font-bold cursor-pointer disabled:opacity-50"
            >
              {isLoading ? t("saving") : t("save")}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
                className="h-12 px-8 rounded-xl border-divider font-bold text-content-secondary cursor-pointer disabled:opacity-50"
              >
                {t("cancel")}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}
