import { Avatar, Box, Button, Flex, TextField, Text } from "@radix-ui/themes";
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import '../../../Styles/navBar/navBarStyles.css';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useNavigate } from "react-router-dom";

export const NavBarView = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user)

  return (
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
        <Flex align="center" width="75%" pl="27%">
          <TextField.Root placeholder="Search users" className="search_field">
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {user ? (
          <>
            <Flex justify="center" align="center" pl="3%">
              <button className="logo_button" onClick={logout}>
                <Text>{user.user.userTag || 'Guest'}</Text>
                <Avatar fallback={user?.user.userTag?.charAt(1).toUpperCase() || 'U'} />
              </button>
            </Flex>
          </>
        ) : (
          <Flex justify="center" align="center" pl="8%">
            <Button onClick={() => navigate('/login')}>
              login
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
