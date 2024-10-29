import { Flex } from '@radix-ui/themes'
import React from 'react'
import { RegisterView } from './view/RegisterView'

export const Register = () => {
  return (
    <>
      <Flex width="100vw" height="100vh" align="center" justify="center">
        <RegisterView/>
      </Flex>
    </>
  )
}
