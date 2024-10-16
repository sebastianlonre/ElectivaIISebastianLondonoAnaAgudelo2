import { Avatar, Box, Button, Flex, TextField, Text } from "@radix-ui/themes";
import '../../../Styles/navBar/navBarStyles.css'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const NavBarView = () => {
  return (
    <>
      <Box height="64px" className="container">
        <Flex height="100%">
          <Flex width="7%" py="4" justify="center">
            <button className="logo_button">
              <img
                src="../src/assets/logo.png"
                className="logo_image"
              />
            </button>
          </Flex>
          <Flex align="center"width="75%" pl="27%">
            <TextField.Root placeholder="Search users" className="search_field">
              <TextField.Slot>
                <MagnifyingGlassIcon/>
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex justify="center" align="center" pl="2%">
            <Button variant="outline">
              +
            </Button>
          </Flex>
          <Flex justify="center" align="center" pl="2%">
            <button className="logo_button">
              <Text> @userTag </Text>
              <Avatar fallback="U"/>
            </button>

          </Flex>
        </Flex>
      </Box>
    </>
  )
}
