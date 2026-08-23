import { requireAdminSession } from "@/lib/require-auth";

export default async function AdminActionRenderProbe() {
  const [first, second] = await Promise.all([
    requireAdminSession(),
    requireAdminSession(),
  ]);

  return (
    <p data-testid="render-authorization-result">
      {first.email}:{second.email}
    </p>
  );
}
