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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { adSchema, type AdFormValues } from "../schemas/adSchemas"

interface AdFormProps {
  initialData?: Partial<AdFormValues>
  onSubmit: (data: AdFormValues) => void
  onCancel?: () => void
  isLoading?: boolean
}

export function AdForm({ initialData, onSubmit, onCancel, isLoading = false }: AdFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.photo instanceof File 
      ? URL.createObjectURL(initialData.photo) 
      : (typeof initialData?.photo === 'string' ? initialData.photo : null)
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<AdFormValues>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      name: initialData?.name || "",
      isShown: initialData?.isShown ?? true,
      note: initialData?.note || "",
      photo: initialData?.photo,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Photo */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 rounded-[24px] border border-divider shadow-none">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Photo</h3>
            
            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-content-secondary text-base">Photo</FormLabel>
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
                            Drag and drop image here, or click add image
                          </p>
                          <Button 
                            type="button"
                            className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer rounded-xl px-6 h-11 font-semibold shadow-none"
                            onClick={(e) => {
                              e.stopPropagation()
                              fileInputRef.current?.click()
                            }}
                          >
                            Add Image
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
            <h3 className="text-xl font-semibold text-content-primary mb-6">General Information</h3>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-base text-content-secondary">Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none" 
                        placeholder="Enter ad name..." 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      Is Shown
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-base text-content-secondary">Note</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        className="min-h-[200px] rounded-xl border-divider/50 focus:border-primary px-4 py-3 resize-none shadow-none" 
                        placeholder="Enter note here..." 
                      />
                    </FormControl>
                    <FormMessage />
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
              {isLoading ? "Saving..." : "Save Ad"}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
                className="h-12 px-8 rounded-xl border-divider font-bold text-content-secondary cursor-pointer disabled:opacity-50"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

