import { Flex } from "@radix-ui/themes"
import { LoginView } from "./view/LoginView"

export const Login = () => {
  return (
    <>
      <Flex width="100vw" height="100vh" align="center" justify="center">
        <LoginView/>
      </Flex>
    </>
  )
}
