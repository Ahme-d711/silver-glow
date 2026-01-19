"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function PasswordsView() {
  return (
    <div className="p-8 space-y-8">
      <p className="text-content-primary text-lg">
        To change the password: Enter the password below and click on save.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold text-content-primary">Old Password</Label>
          <Input 
            type="password" 
            className="border-divider h-20 bg-white focus-visible:ring-0 text-base" 
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold text-content-primary">New Password</Label>
          <Input 
            type="password" 
            className="border-divider h-20 bg-white focus-visible:ring-0 text-base" 
          />
        </div>
      </div>

      <div className="flex pt-4">
        <Button className="h-12 px-12 bg-primary text-white font-semibold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer">
          Submit
        </Button>
      </div>
    </div>
  )
}
