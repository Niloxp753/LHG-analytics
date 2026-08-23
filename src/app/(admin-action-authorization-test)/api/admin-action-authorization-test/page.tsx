import { notFound } from "next/navigation";
import AdminActionAuthorizationProbe from "../../admin-action-authorization-test/admin-action-authorization-probe";

export default function AdminActionAuthorizationTestPage() {
  if (process.env.PLAYWRIGHT_MOCKS !== "true") {
    notFound();
  }

  return <AdminActionAuthorizationProbe />;
}
