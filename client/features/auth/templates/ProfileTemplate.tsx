"use client";

import { ProfileContent } from "../components/ProfileContent";

export default function ProfileTemplate() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <ProfileContent />
      </div>
    </div>
  );
}
