"use client";

import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { Order } from "../types";
import { Product } from "@/features/dashboard/products/types";
import { User } from "@/features/auth/types"; 
import { UserReference } from "@/types";

import { getAllProducts, getProductById } from "@/features/dashboard/products/services/product.service";
import { getAllUsers } from "@/features/dashboard/users/services/user.service";

import { getOrderFormSchema } from "../schemas/orderSchemas";

// Section Components
import { CustomerSection } from "./form-sections/CustomerSection";
import { ItemsSection } from "./form-sections/ItemsSection";
import { ShippingSection } from "./form-sections/ShippingSection";
import { PaymentSection } from "./form-sections/PaymentSection";
import { NotesSection } from "./form-sections/NotesSection";
import { SummarySection } from "./form-sections/SummarySection";

const staticT = (key: string) => key;
export const orderFormSchema = getOrderFormSchema(staticT);
export type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  defaultValues?: Partial<Order>;
  onSubmit: (values: OrderFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export function OrderForm({
  defaultValues,
  onSubmit,
  isLoading,
  onCancel,
  submitLabel,
  isEdit,
}: OrderFormProps) {
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");
  const tValidation = useTranslations("Validation");

  const initialUserId = typeof defaultValues?.userId === 'object' && defaultValues?.userId !== null 
    ? (defaultValues.userId as UserReference)._id 
    : (defaultValues?.userId as string) || "";

  const form = useForm<OrderFormData>({
    resolver: zodResolver(getOrderFormSchema(tValidation)) as Resolver<OrderFormData>,
    defaultValues: {
      userId: initialUserId,
      items: (defaultValues?.items || []).map((item) => ({
        productId: typeof item.productId === 'object' && item.productId !== null ? (item.productId as { _id: string })._id : (item.productId || ""),
        name: item.name || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || "",
        size: item.size || "",
      })).length > 0 ? (defaultValues?.items || []).map((item) => ({
        productId: typeof item.productId === 'object' && item.productId !== null ? (item.productId as { _id: string })._id : (item.productId || ""),
        name: item.name || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || "",
        size: item.size || "",
      })) : [{ productId: "", name: "", price: 0, quantity: 1, image: "", size: "" }],
      recipientName: defaultValues?.recipientName || "",
      recipientPhone: defaultValues?.recipientPhone || "",
      shippingAddress: defaultValues?.shippingAddress || "",
      city: defaultValues?.city || "",
      governorate: defaultValues?.governorate || "",
      country: defaultValues?.country || "",
      postalCode: defaultValues?.postalCode || "",
      paymentMethod: defaultValues?.paymentMethod || "COD",
      customerNotes: defaultValues?.customerNotes || "",
      adminNotes: defaultValues?.adminNotes || "",
      status: defaultValues?.status || "PENDING",
      paymentStatus: defaultValues?.paymentStatus || "PENDING",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [selectedProducts, setSelectedProducts] = React.useState<Record<string, Product>>({});

  // Populate selected products on mount (for edit mode)
  React.useEffect(() => {
    const loadInitialProducts = async () => {
      const items = defaultValues?.items || [];
      const productIds = items.map(item => {
        if (typeof item.productId === 'object' && item.productId !== null) {
          return (item.productId as { _id: string })._id;
        }
        return item.productId;
      }).filter(Boolean);
      
      if (productIds.length > 0) {
        const uniqueIds = [...new Set(productIds)];
        const fetchedProducts: Record<string, Product> = {};
        
        for (const id of uniqueIds) {
          try {
            const product = await getProductById(id);
            if (product) {
              fetchedProducts[id] = product;
            }
          } catch (error) {
            console.error(`Failed to fetch product ${id}`, error);
          }
        }
        setSelectedProducts(prev => ({ ...prev, ...fetchedProducts }));
      }
    };
    loadInitialProducts();
  }, [defaultValues?.items]);

  const handleProductSelect = (index: number, product: Product) => {
    if (product) {
      setSelectedProducts(prev => ({ ...prev, [product._id]: product }));
      form.setValue(`items.${index}.name`, product.nameAr || product.nameEn);
      form.setValue(`items.${index}.image`, product.mainImage);
      
      if (product.sizes && product.sizes.length > 0) {
        const firstSize = product.sizes[0];
        form.setValue(`items.${index}.size`, firstSize.size);
        form.setValue(`items.${index}.price`, firstSize.price);
      } else {
        form.setValue(`items.${index}.size`, "");
        form.setValue(`items.${index}.price`, product.price);
      }
    }
  };

  const handleSizeSelect = (index: number, size: string) => {
    const productId = form.getValues(`items.${index}.productId`);
    const product = selectedProducts[productId];
    if (product && product.sizes) {
      const selectedSize = product.sizes.find(s => s.size === size);
      if (selectedSize) {
        form.setValue(`items.${index}.price`, selectedSize.price);
      }
    }
  };

  const handleUserSelect = (user: User) => {
    if (user) {
      form.setValue("recipientName", user.name || "");
      form.setValue("recipientPhone", user.phone || "");
    }
  };

  const fetchUsers = async (search: string) => {
    const response = await getAllUsers({ search, limit: 10 });
    return response.success ? response.data?.users || [] : [];
  };

  const fetchProducts = async (search: string) => {
    const response = await getAllProducts({ search, limit: 10 });
    return Array.isArray(response) ? response : [];
  };

  const totalAmount = ((form.watch("items") || []).reduce(
    (acc: number, item) => acc + (Number(item.price) * Number(item.quantity) || 0),
    0
  )).toFixed(2);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomerSection
          control={form.control}
          t={t}
          tCommon={tCommon}
          onUserSelect={handleUserSelect}
          fetchUsers={fetchUsers}
          isEdit={isEdit}
        />

        <ItemsSection
          form={form}
          fields={fields}
          append={append}
          remove={remove}
          t={t}
          tCommon={tCommon}
          selectedProducts={selectedProducts}
          handleProductSelect={handleProductSelect}
          handleSizeSelect={handleSizeSelect}
          fetchProducts={fetchProducts}
          isEdit={isEdit}
        />

        <ShippingSection
          control={form.control}
          t={t}
          tCommon={tCommon}
        />

        <PaymentSection
          control={form.control}
          t={t}
          isEdit={isEdit}
        />

        <NotesSection
          control={form.control}
          t={t}
          isEdit={isEdit}
        />

        <SummarySection
          t={t}
          tCommon={tCommon}
          itemCount={fields.length}
          totalAmount={totalAmount}
        />

        <div className="flex gap-4 justify-end pt-8 border-t border-divider/50">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="px-10 h-12 rounded-xl border-divider text-content-secondary font-bold hover:bg-gray-100"
            >
              {tCommon("cancel")}
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="px-12 h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            {isLoading && <Loader className="me-2 h-5 w-5 animate-spin" />}
            {submitLabel || tCommon("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
