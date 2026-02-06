"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const t = useTranslations("Shop");

  // Standard Ring Sizes
  const sizeChart = [
    { us: "5", eu: "49", diameter: "15.7 mm" },
    { us: "6", eu: "52", diameter: "16.5 mm" },
    { us: "7", eu: "54", diameter: "17.3 mm" },
    { us: "8", eu: "57", diameter: "18.1 mm" },
    { us: "9", eu: "59", diameter: "19.0 mm" },
    { us: "10", eu: "62", diameter: "19.8 mm" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold uppercase tracking-tight">
            {t("ring_size_chart") || "Ring Size Guide"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-content-secondary mb-4 text-center">
            {t("size_guide_desc") || "Use the chart below to determine your size based on diameter or international standards."}
          </p>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead className="text-center font-bold text-primary">US Size</TableHead>
                  <TableHead className="text-center font-bold text-primary">EU Size</TableHead>
                  <TableHead className="text-center font-bold text-primary">Diameter</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizeChart.map((row) => (
                  <TableRow key={row.us}>
                    <TableCell className="text-center font-medium">{row.us}</TableCell>
                    <TableCell className="text-center text-content-secondary">{row.eu}</TableCell>
                    <TableCell className="text-center text-content-secondary">{row.diameter}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
