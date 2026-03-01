import React from "react";
import { Control } from "react-hook-form";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { SectionHeader } from "./SectionHeader";

interface PaymentSectionProps {
  control: Control<any>;
  t: (key: string) => string;
  isEdit?: boolean;
}

export function PaymentSection({
  control,
  t,
  isEdit,
}: PaymentSectionProps) {
  return (
    <div className="space-y-4">
      <SectionHeader title={t("payment_status")} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UniSelect
          control={control}
          name="paymentMethod"
          label={t("payment_method")}
          options={[
            { label: t("payment_cod"), value: "COD" },
            { label: t("payment_card"), value: "CARD" },
            { label: t("payment_paypal"), value: "PAYPAL" },
            { label: t("payment_wallet"), value: "WALLET" },
          ]}
          required
        />

        <UniSelect
          control={control}
          name="paymentStatus"
          label={t("payment_status")}
          options={[
            { label: t("pending"), value: "PENDING" },
            { label: t("paid"), value: "PAID" },
            { label: t("failed"), value: "FAILED" },
          ]}
          disabled={!isEdit}
        />
      </div>

      {isEdit && (
        <UniSelect
          control={control}
          name="status"
          label={t("order_status")}
          options={[
            { label: t("pending"), value: "PENDING" },
            { label: t("confirmed"), value: "CONFIRMED" },
            { label: t("processing"), value: "PROCESSING" },
            { label: t("shipped"), value: "SHIPPED" },
            { label: t("delivered"), value: "DELIVERED" },
            { label: t("cancelled"), value: "CANCELLED" },
            { label: t("returned"), value: "RETURNED" },
          ]}
          required
        />
      )}
    </div>
  );
}
