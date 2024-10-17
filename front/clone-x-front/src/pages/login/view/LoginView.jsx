import { Flex, TextField, Box, Button, Text } from '@radix-ui/themes'
import React from 'react'
import "../../../Styles/RegisterStyles/registerStyle.css"


export const LoginView = () => {
  return (
    <>
      <Flex width="80vw" height="80vh" className='flex-border'>
        <Flex width="50%">
          <img
            src='.\src\assets\login_wallpaper.jpg'
            className='background_image'
           />
        </Flex>

        <Flex width="50%" p="8" justify="center" align="center">
          <Box width="90%">
            <Text size="6">
              Login
            </Text>
            <Box pt="6">
              <TextField.Root  placeholder="User Tag" size="3">

              </TextField.Root>
            </Box>

            <Box pt="6">
              <TextField.Root  placeholder="Password" size="3" type='password'>

              </TextField.Root>
            </Box>

            <Flex pt="8">
              <Button size="3" variant="soft">
                Register
              </Button>
              <Flex pl="2">
                <button>
                  <Text size="1" color='gray'>
                    Don't have an account? Sign up.
                  </Text>
                </button>
              </Flex>
            </Flex>

          </Box>

        </Flex>
      </Flex>
    </>
  )
}
