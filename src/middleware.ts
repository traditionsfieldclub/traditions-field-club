import { NextRequest, NextResponse } from "next/server";

/**
 * Facebook's iOS/Android in-app browser (and Meta's link crawler) often send
 * Range requests. Serving HTML as 206 Partial Content can fail inside that
 * WebView with a generic "Page not found". Strip Range for those clients so
 * they get a full 200 document. Leave Range alone for normal browsers and for
 * media assets (matcher excludes video/image paths).
 */
export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const isMetaClient =
    /FBAN|FBAV|FB_IAB|FBIOS|FB4A|facebookexternalhit|Facebot|Meta-ExternalAds/i.test(
      ua,
    );

  if (isMetaClient && request.headers.has("range")) {
    const headers = new Headers(request.headers);
    headers.delete("range");
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|media/|images/|.*\\.(?:mp4|webm|mov|m4v|mp3|wav|jpg|jpeg|png|webp|gif|svg|ico|woff2?)$).*)",
  ],
};
