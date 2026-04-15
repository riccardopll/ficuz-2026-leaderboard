import type { APIRoute } from "astro";

import {
  ADMIN_COOKIE_NAME,
  getAdminCookieOptions,
  getSafeRedirectPath,
  redirect,
} from "../../lib/admin-auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const next = getSafeRedirectPath(String(formData.get("next") ?? "/"));

  cookies.delete(ADMIN_COOKIE_NAME, getAdminCookieOptions(request));

  return redirect(new URL(next, request.url));
};
