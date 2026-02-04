import { NextResponse } from "next/server";
import { auth } from "./auth";
import { authRoutes, publicRoutes } from "./routes";
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isPublic) return NextResponse.next();
  else if (isAuthRoute) {
    if (isLoggedIn) return NextResponse.redirect(new URL("/members", nextUrl));
    else return NextResponse.next();
  } else if (!isLoggedIn)
    return NextResponse.redirect(new URL("/login", nextUrl));
  else return NextResponse.next();
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
