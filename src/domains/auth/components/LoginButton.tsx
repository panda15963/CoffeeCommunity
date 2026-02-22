"use client";

import { supabase } from "@/utils/supabase/client";

export default function LoginButton() {
    const login = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/oauth/callback`,
            },
        });
    };

    return (
        <button onClick={login}>
            Google Login
        </button>
    );
}