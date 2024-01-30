import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";
import { Database } from "@/lib/supabase/supabase.types";

export async function GET(req: NextRequest){
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get("code");

    if(code){
        const supabase = createRouteHandlerClient<Database>({cookies});
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}