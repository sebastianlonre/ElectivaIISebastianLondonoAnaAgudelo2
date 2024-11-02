import { Flex, TextField, Box, Button, Text } from '@radix-ui/themes';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../../../Styles/RegisterStyles/registerStyle.css";

export const LoginView = () => {
  const { login } = useContext(AuthContext);
  const [userTag, setUserTag] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { message, ok } = await login(userTag, password);

    if ( ok ) {
      navigate('/');
    } else {
      setError(message || 'invalid credentials');
    }
  };

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
            <Text size="6">Login</Text>
            <form onSubmit={handleLogin}>
              <Box pt="6">
                <TextField.Root
                  placeholder="User Tag"
                  size="3"
                  value={userTag}
                  onChange={(e) => setUserTag(e.target.value)}
                  required
                />
              </Box>

              <Box pt="6">
                <TextField.Root
                  placeholder="password"
                  size="3"
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>

              {error && (
                <Box pt="4">
                  <Text color="red" size="2">{error}</Text>
                </Box>
              )}

              <Flex pt="8">
                <Button size="3" variant="soft" type="submit">
                  Login
                </Button>
                <Flex pl="2">
                  <button onClick={() => navigate('/register')}>
                    <Text size="1" color="gray">
                      Don't have an account? Sign up.
                    </Text>
                  </button>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
