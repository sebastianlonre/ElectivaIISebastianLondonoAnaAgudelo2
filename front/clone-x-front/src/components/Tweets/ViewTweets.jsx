import { Avatar, Flex, Box, Text } from "@radix-ui/themes"
import '../../Styles/ComponentsStyles/ViewTweetStyle.css'
import { useNavigate } from "react-router-dom";

export const ViewTweets = ({ tweet }) => {
  const navigate = useNavigate();
  return (
    <>
      <hr />
      <Flex width="100%" height="200px" className="container_style">
        <Flex p="6">
          <Avatar fallback="U" />
        </Flex>
        <Flex p="6" width="100%" direction="column">
          <Flex width="100%" align="center">
            <Flex>
              <button onClick={() => navigate(`/profile/${tweet.userTag}`)}>
                <Flex gap="2" align="center">
                  <Text weight="bold" size="3">
                    {tweet.userName}
                  </Text>
                  <Text size="2">
                    {tweet.userTag}
                  </Text>
                </Flex>
              </button>
            </Flex>
            <Box ml="auto">
              <Text weight="light" size="3">
                {new Date(tweet.createTweetAt).toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
          <Box p="3">
            <Text>
              {tweet.content}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>

  );
}
