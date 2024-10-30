import { Flex, Avatar, TextArea, Box, Button } from "@radix-ui/themes"
import '../../../Styles/homePage/homePageStyles.css'
import { useState } from "react"
import { newTweet } from "../../../api/calls/tweetsRequest";



export const NewTweetView = () => {

  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const createNewtweet = async (e) => {
    const { message, ok } = await newTweet(content);

    if (!ok) {
      e.preventDefault();
      setError(message || 'error to publish tweet');
    }
  };

  return (
    <>
      <Flex width="100%" height="180px" className="container_style">
        <Flex p="6">
          <Avatar fallback="U" />
        </Flex>
        <Box width="85%" p="5">
          <form onSubmit={createNewtweet}>
            <TextArea
              placeholder="What's on your mind?..."
              size="3" variant="classic"
              maxLength="200"
              onChange={(e) => setContent(e.target.value)}
            />
            <Flex pt="3" justify="end">
              <Button size="2" type="submit">
                post
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
      {error && (
        <Box pt="4">
          <Text color="red" size="2">{error}</Text>
        </Box>
      )}
    </>
  )
}
