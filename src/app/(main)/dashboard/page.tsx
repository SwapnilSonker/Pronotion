import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import db from '@/lib/supabase/db';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/supabase/supabase.types';

const DashboardPage = async() => {

  const supabase = createServerComponentClient<Database>({ cookies});
  const { data: {user}, } = await supabase.auth.getUser();

  if(!user) return;
  
  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

  const { data: subscription , error: subscriptionError } = await getUserSubscriptionStatus(user.id);


  if(subscriptionError) return;
  if (!workspace)
    return (
      <div
        className="bg-background h-screen w-screen 
        flex justify-center items-center"
      >
        {/* <DashboardSetup user={user} subscription={subscription} /> */}
        Hello world
      </div>
      // <div>
      //   Hello
      // </div>
    );

  // redirect(`/dashboard/${workspace.id}`);
}

export default DashboardPage;

// import React from 'react'

// const Dashboardpage = () => {
//   return (
//     <div>Dashboardpage</div>
//   )
// }

// export default Dashboardpage