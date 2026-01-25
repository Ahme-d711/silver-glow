import UserTemplate from "@/features/dashboard/users/templates/UserTemplate";
import { Suspense } from "react";
import UniLoading from "@/components/shared/UniLoading";

export default function UserPage() {
  return (
    <Suspense fallback={<UniLoading message="Loading search..." />}>
      <UserTemplate />
    </Suspense>
  );
}
