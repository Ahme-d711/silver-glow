"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { DELIVERY_RATE_ROWS } from "../../constants/delivery.constants";

export function DeliveryRatesTable() {
  const t = useTranslations("Delivery");

  return (
    <section className="bg-background p-10 rounded-3xl border border-divider">
      <h2 className="text-2xl font-bold text-primary mb-6 text-start">
        {t("rates_title")}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-start">
          <thead>
            <tr className="border-b border-divider">
              <th className="py-4 font-bold text-primary">{t("table_area")}</th>
              <th className="py-4 font-bold text-primary">{t("table_rate")}</th>
              <th className="py-4 font-bold text-primary">{t("table_time")}</th>
            </tr>
          </thead>
          <tbody className="text-content-secondary">
            {DELIVERY_RATE_ROWS.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-divider/50 hover:bg-white transition-colors",
                  row.id === "free" && "border-b-0",
                )}
              >
                <td
                  className={cn(
                    "py-4",
                    row.highlight && "font-bold text-primary",
                  )}
                >
                  {t(row.areaKey)}
                </td>
                <td
                  className={cn(
                    "py-4",
                    row.highlight && "font-bold text-success",
                  )}
                >
                  {t(row.rateKey)}
                </td>
                <td
                  className={cn(
                    "py-4",
                    row.highlight && "italic font-medium",
                  )}
                >
                  {t(row.timeKey)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
