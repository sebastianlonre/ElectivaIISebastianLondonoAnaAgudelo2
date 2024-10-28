import { Avatar, Flex, Text } from "@radix-ui/themes"
import '../../../Styles/profileStyles/profileStyles.css'

export const ProfileView = (userData) => {
  return (
    <>
      <Flex width="100%" height="300px" className="container_info" direction="column">
        <Flex width="100%" height="50%">
          <img
            className="background_imageP"
            src="..\src\assets\profile_wallpaper.jpg"
          />
        </Flex>
        <Flex width="100%" height="50%">
          <Flex pl="18%" pt="5" direction="column">
            <Text>
              @UserTag
            </Text>
            <Text weight="bold" size="4">
              User complete name
            </Text>
            <Flex pt="4" gap="4">
            <button className="item_button">
              <Text>
                followers 0
              </Text>
            </button>
            <button className="item_button">
              <Text>
                followings 0
              </Text>
            </button>

            </Flex>
          </Flex>
        </Flex>

      </Flex>
      <Avatar size="7" variant="solid" radius="full"className="avatar_style" fallback="A">
        </Avatar>
    </>
  )
}
