import { Flex, Box } from "@radix-ui/themes";
import { NewTweetView } from "./view/NewTweetView";
import { useEffect, useState } from "react";
import { TweetsInFeed } from "../../api/calls/tweetsRequest";
import { GrindTweets } from "../../components/Tweets/GrindTweets";

export const HomePageP = () => {

  const [tweetsData, setTweetsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTweetsInFeed = async () => {
      const tweets = await TweetsInFeed();
      if (tweets.ok) {
        setTweetsData(tweets.tweets.data);
      } else {
        setError(tweets.message);
      }
    };
    fetchTweetsInFeed();
  }, []);

  return (
    <>
      <Flex justify="center">
        <Box width="65%">
          <NewTweetView />
          {error && <div>Error: {error}</div>}
          <GrindTweets tweetData={tweetsData.tweetsInFeed}/>
        </Box>
      </Flex>
    </>
  );
};
