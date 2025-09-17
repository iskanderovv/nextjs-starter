import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const supportedLocales = ["uz", "ru", "en"];

  const firstSegment = pathname.split("/")[1];

  if (firstSegment && !supportedLocales.includes(firstSegment) && firstSegment.length === 2) {
    return NextResponse.redirect(new URL(`/uz${pathname.slice(3)}`, req.url));
  }

  return intlMiddleware(req);
}
export const config = {
  matcher: ["/", "/(uz|ru|en)/:path*"],
};
