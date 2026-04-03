import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const publicRoutes = new Set(["/", "/login", "/signup"]);

type MiddlewareSession = {
  user?: {
    id?: string;
    email?: string | null;
    setupCompleted?: boolean;
  };
} | null;

export function resolveProtectedRoute(
  pathname: string,
  session?: MiddlewareSession,
) {
  const isPublicRoute = publicRoutes.has(pathname);
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const isOnboardingRoute = pathname === "/onboarding";

  if (!session?.user && !isPublicRoute) {
    return "/login";
  }

  if (session?.user && isAuthRoute) {
    return session.user.setupCompleted ? "/app" : "/onboarding";
  }

  if (
    session?.user &&
    !session.user.setupCompleted &&
    !isPublicRoute &&
    !isOnboardingRoute
  ) {
    return "/onboarding";
  }

  return null;
}

type AuthenticatedRequest = NextRequest & {
  auth: MiddlewareSession;
};

export default auth((request: AuthenticatedRequest) => {
  const { nextUrl, auth: session } = request;
  const destination = resolveProtectedRoute(nextUrl.pathname, session);

  if (destination) {
    return NextResponse.redirect(new URL(destination, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
