
import { Spinner, Flex } from "@radix-ui/themes";
import { ViewTweets } from "./ViewTweets";

export const GrindTweets = ({ tweetData }) => {

  if (!tweetData || tweetData.length === 0) {
    return (
      <>
      <Flex justify="center" align="center">
        <Spinner size="3"/>
      </Flex>
      </>);
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
