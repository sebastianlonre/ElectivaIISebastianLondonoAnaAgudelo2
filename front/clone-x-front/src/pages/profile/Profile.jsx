import React from 'react'
import { ProfileView } from './view/ProfileView'
import { Flex, Box } from '@radix-ui/themes'
import { ViewTweets} from '../../components/view/ViewTweets'

export const Profile = () => {
  return (
    <>
      <Flex justify="center">
        <Box width="65%">
          <ProfileView/>
          <ViewTweets/>
        </Box>
      </Flex>
    </>
  )
}
