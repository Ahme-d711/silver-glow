"use client";

import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserFormActionsProps } from "../../types/user-form.types";

export function UserFormActions({
  isLoading,
  onCancel,
  submitLabel,
  cancelLabel,
}: UserFormActionsProps) {
  return (
    <div className="flex pt-4 gap-3">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-xl h-11 px-6 cursor-pointer"
        >
          {cancelLabel}
        </Button>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-primary text-white hover:bg-primary/90 rounded-xl h-11 px-8 cursor-pointer"
      >
        {isLoading && <Loader className="me-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </div>
  );
}
