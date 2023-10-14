import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PlayStoryForm from "@/components/PlayStoryForm";

export const dynamic = "force-dynamic";

export default async function Index({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("user_stories")
    .select()
    .eq("id", params.id)
    .maybeSingle();

  if (!data) {
    redirect("/404");
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl w-full text-center mb-2">{data.title}</h1>
          {/* <PlayStoryForm text={`${data.title}. ${data.content}`} /> */}
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{data.content}</p>
      </CardContent>
    </Card>
  );
}
