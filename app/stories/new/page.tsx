import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Header from "@/components/common/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CreateStoryForm from "@/components/CreateStoryForm";
import FreeStoryBanner from "@/components/FreeStoryBanner";
import { Database } from "@/types/supabase";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Index() {
  // TODO - a lot of this db stuff should be refactored so it can be reused
  // this is copied across profile as well
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
      <Card>
        <CardHeader>
          <h1 className="text-center text-4xl mb-2">Create a New Story</h1>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Write as much or as little as you want. What do you want your story
            to be about? Themes, characters, time period, you can be as vague or
            specific as you want.
          </p>
          <CreateStoryForm
            disabled={
              free_stories_remaining === null || free_stories_remaining === 0
            }
          />
        </CardContent>
      </Card>
    </>
  );
}
