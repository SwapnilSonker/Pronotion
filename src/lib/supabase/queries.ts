"use server";

import db from "./db"
import { Subscription } from "./supabase.types";

export const getUserSubscriptionStatus = async (userId: string) => {
    try {
        console.log("getUserSubscriptionStatus - Start");
        
        const data = await db.query.subscriptions.findFirst({
            where: (s, {eq}) => eq(s.userId , userId),
        });

        console.log("getUserSubscriptionStatus - End");
        if(data) return { data : data as Subscription, error: null};
        else return { data: null , error: null};
    } catch (error) {
        console.log("Subscription Error",error);
        return { data: null , error: `Error fetching subscription status`};
    }
}