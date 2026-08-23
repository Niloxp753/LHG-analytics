import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminActionRenderProbe from "../../../../admin-action-authorization-test/admin-action-render-probe";

export default function AdminActionAuthorizationRenderTestPage() {
  if (process.env.PLAYWRIGHT_MOCKS !== "true") {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <AdminActionRenderProbe />
    </Suspense>
  );
}
