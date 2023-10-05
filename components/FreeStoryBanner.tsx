import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

type Props = {
  storiesRemaining: number;
};

const FreeStoryBanner: React.FC<Props> = ({ storiesRemaining }) => {
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl text-center">
          You have {storiesRemaining} free{" "}
          {storiesRemaining === 1 ? "story" : "stories"} remaining!
        </p>
      </CardHeader>
    </Card>
  );
};

export default FreeStoryBanner;
