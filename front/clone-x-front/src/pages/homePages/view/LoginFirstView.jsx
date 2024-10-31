import { Flex, Text } from "@radix-ui/themes"

export const LoginFirstView = () => {
  return (
    <>
    <Flex width="100%" height="100px" className="container_style" align="center">
      <Flex pl="8">
        <Text weight="bold" highContrast="true">login for publish tweets</Text>
      </Flex>
    </Flex>
  </>
  )
}
