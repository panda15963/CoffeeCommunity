import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/utils/supabase/middleware";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createSupabaseMiddlewareClient(req, res);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const isAuthPage =
        req.nextUrl.pathname.startsWith("/board") ||
        req.nextUrl.pathname.startsWith("/post") ||
        req.nextUrl.pathname.startsWith("/profile");

    if (isAuthPage && !session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
}