import { Flex, Text, Button, Box } from "@radix-ui/themes";
import { NewTweetView } from "./view/NewTweetView";

export const HomePageP = () => {
  return (
    <>
      <Flex justify="center">
        <Flex width="65%">
          <NewTweetView/>
        </Flex>
      </Flex>
    </>
  )
}
