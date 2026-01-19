"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet } from "lucide-react"

interface AddBalanceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentBalance: number
  customerName: string
  onConfirm: (amount: number) => void
  isLoading?: boolean
}

export function AddBalanceModal({
  open,
  onOpenChange,
  currentBalance,
  customerName,
  onConfirm,
  isLoading = false,
}: AddBalanceModalProps) {
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)
    if (numAmount > 0) {
      onConfirm(numAmount)
      setAmount("")
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setAmount("")
      onOpenChange(false)
    }
  }

  const numAmount = parseFloat(amount) || 0
  const newBalance = currentBalance + numAmount

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-[24px] p-6">
        <DialogHeader>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Wallet className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-content-primary text-center">
            Add Balance
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-content-secondary mt-2">
            Add balance to {customerName}&apos;s account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold text-content-secondary">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 rounded-xl border-divider focus:ring-primary"
              autoFocus
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2 p-4 bg-gray-50 rounded-xl border border-divider">
            <div className="flex justify-between items-center">
              <span className="text-sm text-content-secondary">Current Balance:</span>
              <span className="text-sm font-semibold text-content-primary">{currentBalance.toFixed(2)}</span>
            </div>
            {numAmount > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-content-secondary">Amount to Add:</span>
                  <span className="text-sm font-semibold text-primary">+{numAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-divider pt-2 mt-2 flex justify-between items-center">
                  <span className="text-sm font-semibold text-content-primary">New Balance:</span>
                  <span className="text-sm font-bold text-primary">{newBalance.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

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
              disabled={isLoading || numAmount <= 0}
              className="bg-primary text-white hover:bg-primary/90 rounded-xl"
            >
              {isLoading ? "Adding..." : "Add Balance"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

