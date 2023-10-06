import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const dynamic = "force-dynamic";

type Props = {
  limit?: number;
  userOnly?: boolean;
};

const StoryList: React.FC<Props> = async ({ limit = 30, userOnly }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  let query = supabase.from("user_stories").select("*");

  if (userOnly) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    query = query.eq("user_id", user?.id || "");
  }

  const { data: stories = [], error } = await query.range(0, limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-max">
      {stories?.map((story) => (
        <Link href={`/stories/${story.id}`}>
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-xl">{story.title}</h3>
            </CardHeader>
            <CardContent>{story.description}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default StoryList;

// export default async function StoryList: React.FC<Props>() {

// }
