import { Avatar, Flex, Text } from "@radix-ui/themes"
import '../../../Styles/profileStyles/profileStyles.css'

export const ProfileView =({userData}) => {

  if (!userData || !userData.user) {
    return <Text>loading...</Text>;
  }

  const user = userData.user;

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
              {user.userTag}
            </Text>
            <Text weight="bold" size="4">
              {user.userName + " "+user.userLastName}
            </Text>
            <Flex pt="4" gap="4">
            <button className="item_button">
              <Text>
                followers {user.followers.length}
              </Text>
            </button>
            <button className="item_button">
              <Text>
                followings {user.followings.length}
              </Text>
            </button>

            </Flex>
          </Flex>
        </Flex>

      </Flex>
      <Avatar size="7" variant="solid" radius="full"className="avatar_style" fallback={user.userTag?.charAt(1).toUpperCase() || 'U'}>
        </Avatar>
    </>
  )
}
