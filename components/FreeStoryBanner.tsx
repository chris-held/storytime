import { Card, CardHeader } from "./ui/card";

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
