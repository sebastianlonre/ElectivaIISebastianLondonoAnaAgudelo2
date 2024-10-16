import { Flex, Text, Button, Box } from "@radix-ui/themes";
import { NewTweetView } from "./view/NewTweetView";
import { ViewTweets } from "../../components/view/ViewTweets";

export const HomePageP = () => {
  return (
    <>
      <Flex justify="center">
        <Box width="65%">
          <NewTweetView/>
          <ViewTweets/>
        </Box>
      </Flex>
    </>
  )
}
