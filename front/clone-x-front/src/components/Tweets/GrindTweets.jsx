import { Text } from "@radix-ui/themes";
import { ViewTweets } from "./ViewTweets";

export const GrindTweets = ({ tweetData }) => {

  if (!tweetData || tweetData.length === 0) {
    return <Text>loading...</Text>;
  }

  return (
    <>
      <hr />
      {tweetData.length > 0 ? (
        tweetData.map((tweet) => (
          <ViewTweets key={tweet._id} tweet={tweet} />
        ))
      ) : (
        <div>Not found tweets, follow a user or publish a tweet.</div>
      )}
    </>
  );
};
