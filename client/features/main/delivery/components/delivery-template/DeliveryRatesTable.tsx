"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { DELIVERY_RATE_ROWS } from "../../constants/delivery.constants";

export function DeliveryRatesTable() {
  const t = useTranslations("Delivery");

  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("rates_title")}
        </h2>
        <p className="text-content-secondary leading-relaxed">{t("rates_desc")}</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl border border-divider shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-start min-w-[520px]">
            <thead>
              <tr className="border-b border-divider">
                <th className="py-4 pe-4 font-bold text-primary">{t("table_area")}</th>
                <th className="py-4 pe-4 font-bold text-primary">{t("table_rate")}</th>
                <th className="py-4 font-bold text-primary">{t("table_time")}</th>
              </tr>
            </thead>
            <tbody className="text-content-secondary">
              {DELIVERY_RATE_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-divider/50 hover:bg-primary/[0.03] transition-colors",
                    row.id === "free" && "border-b-0 bg-success/5",
                  )}
                >
                  <td
                    className={cn(
                      "py-4 pe-4",
                      row.highlight && "font-bold text-primary",
                    )}
                  >
                    {t(row.areaKey)}
                  </td>
                  <td
                    className={cn(
                      "py-4 pe-4",
                      row.highlight && "font-bold text-success",
                    )}
                  >
                    {t(row.rateKey)}
                  </td>
                  <td
                    className={cn(
                      "py-4",
                      row.highlight && "italic font-medium text-primary",
                    )}
                  >
                    {t(row.timeKey)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
