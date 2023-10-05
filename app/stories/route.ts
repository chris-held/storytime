import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Database } from "@/types/supabase";

const openai = new OpenAI();

export const dynamic = "force-dynamic";

type OpenAIResponse = { title: string; description: string; content: string };

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const prompt = String(formData.get("prompt"));
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Write me a children's story. Structure the response as JSON with title, description, and content fields, 
                with escaped newline characters so it can be parsed. Make this story appropriate for children regardless of the topic. 
                Here is the topic: ${prompt}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  let story: OpenAIResponse;
  try {
    story = JSON.parse(completion.choices[0].message.content || "");
  } catch (error) {
    throw new Error("Unable to parse chatGPT response");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user_stories")
    .insert([
      {
        ...story,
        user_id: user?.id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  const created = data[0];

  return NextResponse.redirect(`${requestUrl.origin}/stories/${created.id}`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
