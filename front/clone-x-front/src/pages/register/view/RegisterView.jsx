import { Flex, TextField, Box, Button, Text } from '@radix-ui/themes'
import React from 'react'
import "../../../Styles/RegisterStyles/registerStyle.css"

export const RegisterView = () => {
  return (
    <>
      <Flex width="80vw" height="80vh" className='flex-border'>
        <Flex width="50%">
          <img
            src='.\src\assets\register_wallpaper.jpg'
            className='background_image'
           />
        </Flex>
        <Flex width="50%" p="8" justify="center">
          <Box width="90%">
            <Box>
              <TextField.Root  placeholder="Your name" size="3">

              </TextField.Root>
            </Box>

            <Box pt="6">
              <TextField.Root  placeholder="Your last name" size="3">

              </TextField.Root>
            </Box>

            <Box pt="6">
              <TextField.Root  placeholder="User Tag" size="3">

              </TextField.Root>
            </Box>

            <Box pt="6">
              <TextField.Root  placeholder="Your email" size="3">

              </TextField.Root>
            </Box>

            <Box pt="6">
              <TextField.Root  placeholder="And your password" size="3">

              </TextField.Root>
            </Box>

            <Flex pt="8" justify="end" align="center">
              <Button size="3" variant="soft">
                Register
              </Button>
              <Flex pl="2">
                <Text size="1" color='gray'>
                  By signing up, you agree to the terms and conditions.
                </Text>
              </Flex>
            </Flex>

          </Box>

        </Flex>
      </Flex>
    </>
  )
}
