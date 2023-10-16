import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PlayStoryForm from "@/components/PlayStoryForm";

export const dynamic = "force-dynamic";

const fetchStory = async (id: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  return supabase.from("user_stories").select().eq("id", id).maybeSingle();
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data } = await fetchStory(params.id);

  return {
    title: `Storytime - ${data?.title}`,
    description: data?.description,
  };
}

export default async function Index({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await fetchStory(params.id);

  if (!data) {
    redirect("/404");
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl w-full text-center mb-2">{data.title}</h1>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{data.content}</p>
      </CardContent>
    </Card>
  );
}
