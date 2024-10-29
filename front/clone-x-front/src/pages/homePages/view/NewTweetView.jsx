import { Flex, Avatar, TextArea, Box, Button } from "@radix-ui/themes"
import '../../../Styles/homePage/homePageStyles.css'



export const NewTweetView = () => {
  return (
    <>
      <Flex width="100%" height="180px" className="container_style">
        <Flex p="6">
          <Avatar fallback="U"/>
        </Flex>
        <Box width="85%" p="5">
          <TextArea placeholder="What's on your mind?..." size="3" variant="classic"  maxLength="200"/>
          <Flex pt="3" justify="end">
            <Button size="2">
              post
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
