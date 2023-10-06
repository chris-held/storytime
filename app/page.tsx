import StoryList from "@/components/StoryList";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <>
      <h1 className="text-4xl">Adventure Awaits</h1>
      <p className="text-xl">
        Browse our collection of AI assisted, community-driven tales, or sign up
        and create your own!
      </p>
      <StoryList />
    </>
  );
}
