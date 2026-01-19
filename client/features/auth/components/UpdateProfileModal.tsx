"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Upload, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema, type UpdateProfileFormValues } from "../schemas/profileSchemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UpdateProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: {
    name?: string
    phone?: string
    profileImage?: string | null
  }
  onConfirm: (data: UpdateProfileFormValues) => void
  isLoading?: boolean
}

export function UpdateProfileModal({
  open,
  onOpenChange,
  initialData,
  onConfirm,
  isLoading = false,
}: UpdateProfileModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      image: undefined,
    },
  })

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        phone: initialData.phone || "",
        image: undefined,
      })

      // Set image preview if profileImage exists
      if (initialData.profileImage) {
        const imageUrl = initialData.profileImage.startsWith("http") || initialData.profileImage.startsWith("/")
          ? initialData.profileImage
          : `/${initialData.profileImage}`
        setImagePreview(imageUrl)
      } else {
        setImagePreview(null)
      }
    }
  }, [initialData, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    form.setValue("image", undefined)
    setImagePreview(initialData?.profileImage ? (initialData.profileImage.startsWith("http") || initialData.profileImage.startsWith("/") ? initialData.profileImage : `/${initialData.profileImage}`) : null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (data: UpdateProfileFormValues) => {
    onConfirm(data)
  }

  const handleClose = () => {
    if (!isLoading) {
      form.reset()
      setImagePreview(null)
      onOpenChange(false)
    }
  }

  const currentImage = imagePreview || (initialData?.profileImage ? (initialData.profileImage.startsWith("http") || initialData.profileImage.startsWith("/") ? initialData.profileImage : `/${initialData.profileImage}`) : null)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-[24px] p-6">
        <DialogHeader>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
            <User className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-content-primary text-center">
            Update Profile
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-content-secondary mt-2">
            Update your profile information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-4">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-divider">
                  {currentImage ? (
                    <AvatarImage src={currentImage} alt="Profile" className="object-cover" />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                    {form.watch("name")?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                {currentImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-error text-white flex items-center justify-center hover:bg-error/80 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-image-upload"
                  disabled={isLoading}
                />
                <Label htmlFor="profile-image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    disabled={isLoading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {currentImage ? "Change Image" : "Upload Image"}
                  </Button>
                </Label>
              </div>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="h-12 rounded-xl border-divider focus:ring-primary"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      className="h-12 rounded-xl border-divider focus:ring-primary"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-3 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white hover:bg-primary/90 rounded-xl"
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

