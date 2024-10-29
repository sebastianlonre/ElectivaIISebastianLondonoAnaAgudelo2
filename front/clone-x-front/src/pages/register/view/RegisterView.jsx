import { Flex, TextField, Box, Button, Text } from '@radix-ui/themes';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../Styles/RegisterStyles/registerStyle.css";
import { userRegister } from '../../../api/calls/userRequest';
import { AuthContext } from '../../../context/auth/AuthContext';

export const RegisterView = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userTag, setUserTag] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { ok, message } = await userRegister(userName, userLastName, userTag, email, password);

    if (ok) {
      const { message, ok } = await login("@"+userTag, password);
      if(ok){
        navigate('/');
      }else{
        setError(message || 'Error to login')
      }

    } else {
      setError(message || 'Error to register');
    }
  };

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
            <form onSubmit={handleRegister}>
              <Box>
                <TextField.Root
                  placeholder="Your name"
                  size="3"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Box>

              <Box pt="6">
                <TextField.Root
                  placeholder="Your last name"
                  size="3"
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  required
                />
              </Box>

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
                  placeholder="Your email"
                  size="3"
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>

              <Box pt="6">
                <TextField.Root
                  placeholder="And your password"
                  size="3"
                  type='password'
                  value={password}
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
                  Register
                </Button>
                <Flex pl="2">
                  <button onClick={() => navigate('/login')}>
                    <Text size="1" color='gray'>
                      Already have an account? Sign in.
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
}
