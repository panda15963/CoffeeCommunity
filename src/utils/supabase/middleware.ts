import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!; // env 이름 정리

export function createSupabaseMiddlewareClient(
    request: NextRequest,
    response: NextResponse
) {
    let res = response; // response를 수정할 수 있도록

    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );

                res = NextResponse.next({ request });

                cookiesToSet.forEach(({ name, value, options }) =>
                    res.cookies.set(name, value, options)
                );
            },
        },
    });
}