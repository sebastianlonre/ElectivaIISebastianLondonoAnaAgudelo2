import React, { useState, useEffect } from 'react';
import { ProfileView } from './view/ProfileView';
import { Flex, Box, Text } from '@radix-ui/themes';
import { ViewTweets } from '../../components/Tweets/ViewTweets';
import { useParams } from 'react-router-dom';
import { userDataRequest } from '../../api/calls/userRequest';

export const Profile = () => {
  const { usertag } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userDataRequest(usertag);
      if (data.ok) {
        setUserData(data.userData);
        setError(null);
      } else {
        setError(data.message || "Error al cargar los datos del usuario");
      }
    };

    fetchUserData();
  }, [usertag]);

  return (
    <>
      <Flex justify="center">
        <Box width="65%">
          {error ? (
            <Text>{error}</Text>
          ) : (
            <>
             <ProfileView userData={userData}/>
            </>
          )}
        </Box>
    </Flex>
    </>

  );
};