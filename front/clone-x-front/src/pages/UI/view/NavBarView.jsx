import { Avatar, Box, Button, Flex, TextField, Text, DropdownMenu, AlertDialog } from "@radix-ui/themes";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import '../../../Styles/navBar/navBarStyles.css';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useNavigate } from "react-router-dom";
import { userDataRequest } from "../../../api/calls/userRequest";

export const NavBarView = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      let userTagToFind = "@" + searchTerm;
      const { ok } = await userDataRequest(userTagToFind);
      if (ok) {
        navigate(`/profile/${userTagToFind}`);
      } else {
        setIsAlertOpen(true);
      }
    }
  };


  return (
    <Box height="64px" className="container">
      <Flex height="100%">
        <Flex width="7%" py="4" justify="center">
          <button className="logo_button" onClick={() => navigate('/')}>
            <img
              src="../src/assets/logo.png"
              className="logo_image"
            />
          </button>
        </Flex>
        <Flex align="center" width="75%" pl="27%">
          <TextField.Root
            placeholder="search users"
            className="search_field"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {user ? (
          <>
            <Flex justify="center" align="center" pl="1%">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button className="logo_button">
                    <Text>{user.user.userTag || 'Guest'}</Text>
                    <Avatar fallback={user?.user.userTag?.charAt(1).toUpperCase() || 'U'} />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={() => navigate(`/profile/${user.user.userTag}`)}>My profile</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onClick={handleLogout}>logout</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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

      <AlertDialog.Root open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialog.Trigger asChild>
          <Button color="red" style={{ display: 'none' }}>Trigger</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            User not found
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel asChild>
              <Button variant="soft" color="gray" onClick={() => setIsAlertOpen(false)}>
                Cerrar
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
};
