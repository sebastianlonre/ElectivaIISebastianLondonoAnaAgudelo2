import { Avatar, Flex, Text, Button } from "@radix-ui/themes";
import '../../../Styles/profileStyles/profileStyles.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { followUser, unfollowUser } from "../../../api/calls/socialRequest";
import { useModal } from "../../../hooks/UseModals";
import { SocialModal } from "../../../components/modals/SocialModal";


export const ProfileView = ({ userData }) => {
  const userInPage = userData.user;
  const { user, refreshUserInfo } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [dataModal, setdataModal] = useState('')
  const isFollowing = user.followings.some(following => following.followingTag === userInPage.userTag);


  const handleFollow = async () => {
    const response = await followUser(userInPage.userTag);
    await refreshUserInfo(user.user.userTag);
    if (!response.ok) {
      setError(response.message)
    }
  };

  const handleUnfollow = async () => {
    const response = await unfollowUser(userInPage.userTag);
    await refreshUserInfo(user.user.userTag);
    if(!response.ok){
      setError(response.message);
    }
  };

  const handleOpenFollowers = () => {
    setdataModal(userData.followers);
    openModal();
  };

  const handleOpenFollowings = () => {
    setdataModal(userData.followings);
    openModal();
  };



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
              {userInPage.userTag}
            </Text>
            <Text weight="bold" size="4">
              {userInPage.userName + " " + userInPage.userLastName}
            </Text>

            <Flex pt="4" gap="4">
              <button className="item_button" onClick={handleOpenFollowers}>
                <Text>
                  followers {userInPage.followers.length}
                </Text>
              </button>
              <button className="item_button" onClick={handleOpenFollowings}>
                <Text>
                  followings {userInPage.followings.length}
                </Text>
              </button>
              {user.user.userTag !== userInPage.userTag ? (
                <Flex>
                  <Button onClick={isFollowing ? handleUnfollow : handleFollow}>
                    {isFollowing ? "unfollow" : "follow"}
                  </Button>
                </Flex>
              ) : null}
              {error && <div>Error: {error}</div>}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Avatar size="7" variant="solid" radius="full" className="avatar_style" fallback={userInPage.userTag?.charAt(1).toUpperCase() || 'U'}>
      </Avatar>
      <SocialModal isOpen={isOpen} onClose={closeModal} data={dataModal}>
      </SocialModal>
    </>
  );
};
