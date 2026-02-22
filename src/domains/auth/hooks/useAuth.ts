import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_: any, session: Session | null) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return { user };
};
