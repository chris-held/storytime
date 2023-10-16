import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Header from "@/components/common/Header";
import FreeStoryBanner from "@/components/FreeStoryBanner";
import StoryList from "@/components/StoryList";
import { Database } from "@/types/supabase";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  const { data, error } = await supabase
    .from("user_profile")
    .select()
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    return null;
  }

  const { free_stories_remaining } = data;
  return (
    <>
      <FreeStoryBanner storiesRemaining={free_stories_remaining ?? 0} />
      <h2 className="text-2xl text-center">Your Stories</h2>
      <StoryList userOnly={true} />
    </>
  );
}
