import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
        <h1 className="text-2xl text-center mb-2">{data.title}</h1>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{data.content}</p>
      </CardContent>
    </Card>
  );
}
